import z from "zod";
import { AnswerSchema } from "./answer.schema";

export const answerServerSchema = AnswerSchema.extend({
  questionId: z.string().min(1, "Question ID is required"),
});
