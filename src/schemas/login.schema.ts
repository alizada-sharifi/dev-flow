import z from "zod";

export const LoginSchema = z.object({
  email: z.email("Please provide a valid email address"),
  password: z.string().min(6, "password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof LoginSchema>;
