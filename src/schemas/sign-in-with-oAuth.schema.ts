import z from "zod";

export const SignInWithOAuthSchema = z.object({
  provider: z.enum(["github", "google"]),
  providerAccountId: z.string().min(1, "Provider account ID is required"),
  user: z.object({
    name: z.string().min(1, "Name is required"),
    username: z.string().min(1, "Username is Required"),
    email: z.email("Please provider a valid email"),
    image: z.url("Enter a valid Link").optional().or(z.literal("")),
  }),
});

export type SignInWithOAuthData = z.infer<typeof SignInWithOAuthSchema>;
