import { IInteractionDoc } from "@/database/interaction.model";
import { paginatedSearchParams } from ".";
import mongoose from "mongoose";

export type SignInWithOAuthParams = {
  provider: "github" | "google";
  providerAccountId: string;
  user: {
    name: string;
    username: string;
    email: string;
    image: string;
  };
};

export type AuthCredentials = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export type CreateQuestionParams = {
  title: string;
  content: string;
  tags: string[];
};

export interface EditQuestionParams extends CreateQuestionParams {
  questionId: string;
}

export type GetQuestionParams = {
  questionId: string;
};

export interface GetTagQuestionsParams
  extends Omit<paginatedSearchParams, "filter"> {
  tagId: string;
}

export type IncrementViewsParams = {
  questionId: string;
};

export type answerParams = {
  questionId: string;
  content: string;
};

export interface getAnswerParams extends paginatedSearchParams {
  questionId: string;
}

export type VoteProp = {
  targetId: string;
  targetType: "question" | "answer";
  voteType: "upvote" | "downvote";
};

export interface UpdateVoteCountProps extends VoteProp {
  change: 1 | -1;
}

export type HasVoteProp = Pick<VoteProp, "targetId" | "targetType">;
export type HasVoteResponse = {
  isUpvoted: boolean;
  isdownvoted: boolean;
};

export type UpdateReputationParams = {
  interaction: IInteractionDoc;
  session: mongoose.ClientSession;
  performerId: string;
  authorId: string;
};

export type recommendedParams = {
  userId: string;
  query?: string;
  skip: number;
  limit: number;
};
