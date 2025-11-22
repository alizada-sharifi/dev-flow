"use server";

import { ActionResponse, ErrorResponse } from "@/types";
import {
  HasVoteProp,
  HasVoteResponse,
  UpdateVoteCountProps,
  VoteProp,
} from "@/types/action";
import handleError from "../handlers/error";
import {
  CreateVoteSchema,
  HasVoteSchema,
  UpdateVoteSchema,
} from "@/schemas/vote.schema";
import action from "../handlers/action";
import mongoose, { ClientSession } from "mongoose";
import { NotFoundError, UnauthorizedError } from "../http-errors";
import { Answer, Question, Vote } from "@/database";
import { revalidatePath } from "next/cache";
import ROUTES from "@/constants/route";
import { after } from "next/server";
import { createInteraction } from "./interaction.action";

async function updateVoteCount(
  params: UpdateVoteCountProps,
  session?: ClientSession
): Promise<ActionResponse> {
  const validationResult = await action({
    params,
    schema: UpdateVoteSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { targetId, targetType, voteType, change } = validationResult.params!;

  const Model = targetType === "question" ? Question : Answer;
  const voteField = voteType === "upvote" ? "upvotes" : "downvotes";

  try {
    const result = await Model.findByIdAndUpdate(
      targetId,
      { $inc: { [voteField]: change } },
      { new: true, session }
    );

    if (!result) throw new Error("Failed to update vote count");

    return { success: true };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function createVote(params: VoteProp): Promise<ActionResponse> {
  const validationResult = await action({
    params,
    schema: CreateVoteSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { targetId, targetType, voteType } = validationResult.params!;
  const userId = validationResult.session?.user?.id;

  if (!userId)
    handleError(new UnauthorizedError("Unauthorized")) as ErrorResponse;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const Model = targetType === "question" ? Question : Answer;

    const ContentDoc = await Model.findById(targetId).session(session);
    if (!ContentDoc) throw new NotFoundError("Content");

    const contentAuthorId = ContentDoc.author.toString();

    const existingVote = await Vote.findOne({
      author: userId,
      actionId: targetId,
      actionType: targetType,
    }).session(session);

    if (existingVote) {
      //  when a user want to delete his/her vote
      if (existingVote.voteType === voteType) {
        await Vote.deleteOne({ _id: existingVote._id }).session(session);

        await updateVoteCount(
          {
            targetId,
            targetType,
            voteType,
            change: -1,
          },
          session
        );
      } else {
        // when a user want to change his/her vote with another type
        await Vote.findByIdAndUpdate(
          existingVote._id,
          { voteType },
          { new: true, session }
        );

        await updateVoteCount(
          {
            targetId,
            targetType,
            voteType: existingVote.voteType,
            change: -1,
          },
          session
        );

        await updateVoteCount(
          {
            targetId,
            targetType,
            voteType,
            change: 1,
          },
          session
        );
      }
    } else {
      await Vote.create(
        [
          {
            author: userId,
            actionId: targetId,
            actionType: targetType,
            voteType,
          },
        ],
        { session }
      );

      await updateVoteCount(
        {
          targetId,
          targetType,
          voteType,
          change: 1,
        },
        session
      );
    }

    after(async () => {
      await createInteraction({
        action: voteType,
        actionId: targetId,
        actionTarget: targetType,
        authorId: contentAuthorId,
      });
    });

    await session.commitTransaction();

    revalidatePath(ROUTES.QUESTIONS(targetId));
    // Revalidate author's profile to update badges when upvotes change
    revalidatePath(`/profile/${contentAuthorId}`);

    return { success: true };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
}

export async function hasVoted(
  params: HasVoteProp
): Promise<ActionResponse<HasVoteResponse>> {
  const validationResult = await action({
    params,
    schema: HasVoteSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { targetId, targetType } = validationResult.params!;
  const userId = validationResult.session?.user?.id;

  try {
    const vote = await Vote.findOne({
      author: userId,
      actionId: targetId,
      actionType: targetType,
    });

    if (!vote)
      return {
        success: false,
        data: {
          isdownvoted: false,
          isUpvoted: false,
        },
      };

    return {
      success: true,
      data: {
        isdownvoted: vote.voteType === "downvote",
        isUpvoted: vote.voteType === "upvote",
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
