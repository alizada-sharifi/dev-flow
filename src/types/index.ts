import { NextResponse } from "next/server";

export type TagType = {
  _id: string;
  name: string;
  questions?: number;
};

export type AuthorType = {
  _id: string;
  name: string;
  image: string;
};

export type QuestionType = {
  _id: string;
  title: string;
  content: string;
  tags: TagType[];
  author: AuthorType;
  createdAt: Date;
  upvotes: number;
  downvotes: number;
  answers: number;
  views: number;
};

export type AnswerType = {
  _id: string;
  author: AuthorType;
  content: string;
  createdAt: Date;
  upvotes: number;
  downvotes: number;
  question: string;
};

export type RouteParams = {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
};

export type ActionResponse<T = null> = {
  success: boolean;
  data?: T | null;
  error?: { message: string; details?: Record<string, string[]> };
  status?: number;
};

export type SuccessResponse<T = null> = ActionResponse<T> & { success: true };
export type ErrorResponse<T = null> = ActionResponse<T> & { success: false };

export type APiErrorResponse = NextResponse<ErrorResponse>;
export type ApiResponse<T = null> = NextResponse<
  SuccessResponse<T> | ErrorResponse
>;

export type paginatedSearchParams = {
  page?: number;
  pageSize?: number;
  query?: string;
  filter?: string;
  sort?: string;
};

export type UserType = {
  _id: string;
  name: string;
  username: string;
  email: string;
  bio?: string;
  image?: string;
  location?: string;
  portfolio?: string;
  reputaion?: number;
  createdAt: Date;
};

export type CollectionType = {
  _id: string;
  author: AuthorType | string;
  question: QuestionType;
};
export type Badges = {
  GOLD: number;
  SILVER: number;
  BRONZE: number;
};
