import z from "zod";
import { PaginatedSearchParamsSchema } from "./paginated-search-params.schema";

export const UserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.email("Please provide a valid email address"),
  bio: z.string().optional(),
  image: z.url("Enter a valid Link").optional().or(z.literal("")),
  loaction: z.string().optional(),
  portfolio: z.url("Enter a valid Link").optional().or(z.literal("")),
  reputation: z.number().optional(),
});

export const getUserSchema = z.object({
  userId: z.string().min(1, "User Id is required"),
});

export const GetUserQuestionsSchema = PaginatedSearchParamsSchema.extend({
  userId: z.string().min(1, "User Id is required"),
});

export const GetUserAnswersSchema = PaginatedSearchParamsSchema.extend({
  userId: z.string().min(1, "User Id is required"),
});

export const GetUserTagSchema = z.object({
  userId: z.string().min(1, "User Id is required"),
});

export type getUserData = z.infer<typeof getUserSchema>;
export type UserData = z.infer<typeof UserSchema>;
export type getUserQuestionsData = z.infer<typeof GetUserQuestionsSchema>;
export type getUserAnswersData = z.infer<typeof GetUserAnswersSchema>;
export type getUserTagData = z.infer<typeof GetUserTagSchema>;
