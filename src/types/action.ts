import { paginatedSearchParams } from ".";

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
