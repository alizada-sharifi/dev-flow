import z from "zod";

export const DeleteQuestionSchema = z.object({
  questionId: z.string().min(1, "Question ID is required"),
});

export type DeleteQuestionData = z.infer<typeof DeleteQuestionSchema>;
