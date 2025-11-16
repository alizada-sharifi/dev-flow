import z from "zod";
import { PaginatedSearchParamsSchema } from "./paginated-search-params.schema";

export const AnswerSchema = z.object({
  content: z.string().min(10, "Answer has to be at least 10 characters"),
});

export const GetAnswerSchema = PaginatedSearchParamsSchema.extend({
  questionId: z.string().min(1, "Question ID is required"),
});

export type AnswerData = z.infer<typeof AnswerSchema>;
