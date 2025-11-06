import z from "zod";

export const SignUpSchema = z.object({
  email: z.email("Please provide a valid email address"),
  password: z.string().min(6, "password must be at least 6 characters"),
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
});

export type SignUpFormData = z.infer<typeof SignUpSchema>;
