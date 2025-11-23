import z from "zod";

export const GlobalSearchSchema = z.object({
  query: z.string(),
  type: z.string().nullable().optional(),
});

export type GlobalSearchParams = z.infer<typeof GlobalSearchSchema>;
