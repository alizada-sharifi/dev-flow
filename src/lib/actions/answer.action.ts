"use server";

import { revalidatePath } from "next/cache";

import mongoose from "mongoose";
import { Question, Answer, Vote } from "@/database";
import { IAnswerDoc } from "@/database/answer.model";
import action from "../handlers/action";
import { answerParams, getAnswerParams } from "@/types/action";
import { NotFoundError } from "../http-errors";
import handleError from "../handlers/error";

import ROUTES from "@/constants/route";
import { answerServerSchema } from "@/schemas/answer-server.schema";
import { ActionResponse, ErrorResponse, AnswerType } from "@/types";
import {
  DeleteAnswerData,
  DeleteAnswerSchema,
  GetAnswerSchema,
} from "@/schemas/answer.schema";
import { after } from "next/server";
import { createInteraction } from "./interaction.action";

export async function CreateAnswer(
  params: answerParams
): Promise<ActionResponse<IAnswerDoc>> {
  const validationResult = await action({
    params,
    schema: answerServerSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { content, questionId } = validationResult.params!;

  const userId = validationResult?.session?.user?.id;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const question = await Question.findById(questionId);
    if (!question) throw new NotFoundError("Question");

    const [newAnswer] = await Answer.create(
      [
        {
          author: userId,
          question: questionId,
          content,
        },
      ],
      { session }
    );

    if (!newAnswer) throw new Error("Oops, Failed to create the answer");

    question.answers += 1;
    await question.save({ session });

    after(async () => {
      await createInteraction({
        action: "post",
        actionId: newAnswer._id.toString(),
        actionTarget: "answer",
        authorId: userId as string,
      });
    });

    await session.commitTransaction();

    revalidatePath(ROUTES.QUESTIONS(questionId));

    return { success: true, data: JSON.parse(JSON.stringify(newAnswer)) };
  } catch (error) {
    session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    session.endSession();
  }
}

export async function deleteAnswer(
  params: DeleteAnswerData
): Promise<ActionResponse> {
  const validationResult = await action({
    params,
    schema: DeleteAnswerSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { answerId } = validationResult.params!;
  const { user } = validationResult.session!;

  try {
    const answer = await Answer.findById(answerId);
    if (!answer) throw new NotFoundError("Answer");

    if (answer.author.toString() !== user?.id)
      throw new Error("You're not allowed to delete this answer");

    // ===============reduce the question answers count
    await Question.findByIdAndUpdate(
      answer.question,
      { $inc: { answers: -1 } },
      { new: true }
    );

    //===================== delete votes that relate to this answer
    await Vote.deleteMany({ actionId: answerId, actionType: "answer" });

    // ========== delete the answer
    await Answer.findByIdAndDelete(answerId);

    after(async () => {
      await createInteraction({
        action: "delete",
        actionId: answerId,
        actionTarget: "answer",
        authorId: user?.id as string,
      });
    });

    revalidatePath(`/profile/${user?.id}`);

    return { success: true };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getAnswers(params: getAnswerParams): Promise<
  ActionResponse<{
    answers: AnswerType[];
    isNext: boolean;
    totalAnswers: number;
  }>
> {
  const validationResult = await action({
    params,
    schema: GetAnswerSchema,
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const {
    questionId,
    page = 1,
    pageSize = 10,
    filter,
  } = validationResult.params!;

  const skip = (Number(page) - 1) * pageSize;
  const limit = pageSize;

  let sortCriteria = {};

  switch (filter) {
    case "latest":
      sortCriteria = { createdAt: -1 };
      break;
    case "oldest":
      sortCriteria = { createdAt: -1 };
      break;
    case "popular":
      sortCriteria = { createdAt: -1 };
      break;
    default:
      sortCriteria = { createdAt: -1 };
      break;
  }

  try {
    const totalAnswers = await Answer.countDocuments({ question: questionId });

    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id name image")
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);

    const isNext = totalAnswers > skip + answers.length;

    return {
      success: true,
      data: {
        answers: JSON.parse(JSON.stringify(answers)),
        isNext,
        totalAnswers,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
