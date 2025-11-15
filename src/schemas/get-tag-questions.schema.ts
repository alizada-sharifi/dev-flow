import z from "zod";
import { PaginatedSearchParamsSchema } from "./paginated-search-params.schema";

export const GetTagQuestionsSchema = PaginatedSearchParamsSchema.extend({
  tagId: z.string().min(1, "Tag ID is required."),
});
