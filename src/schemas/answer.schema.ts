import z from "zod";

export const AnswerSchema = z.object({
  content: z.string().min(10, "Answer has to be at least 10 characters"),
});

export type AnswerData = z.infer<typeof AnswerSchema>;
