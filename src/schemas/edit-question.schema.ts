import z from "zod";
import { AskQuestionSchema } from "./ask-question.schema";

export const EditQuestionSchema = AskQuestionSchema.extend({
  questionId: z.string().min(1, "Question ID is required"),
});

export type EditQuestionData = z.infer<typeof EditQuestionSchema>;
