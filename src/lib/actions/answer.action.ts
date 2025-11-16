"use server";

import { revalidatePath } from "next/cache";

import mongoose from "mongoose";
import { Question, Answer } from "@/database";
import { IAnswerDoc } from "@/database/answer.model";
import action from "../handlers/action";
import { answerParams } from "@/types/action";
import { NotFoundError } from "../http-errors";
import handleError from "../handlers/error";

import ROUTES from "@/constants/route";
import { answerServerSchema } from "@/schemas/answer-server.schema";
import { ActionResponse, ErrorResponse } from "@/types";

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
