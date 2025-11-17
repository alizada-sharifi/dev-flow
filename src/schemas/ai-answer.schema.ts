import z from "zod";

export const AIAnswerSchema = z.object({
  question: z
    .string()
    .min(5, "Question must be at least 5 characters")
    .max(130, "Question can't exced 130 characters"),
  content: z.string().min(10, "Answer has to be at least 10 characters"),
});
