import z from "zod";

export const UserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.email("Please provide a valid email address"),
  bio: z.string().optional(),
  image: z.url("Enter a valid Link").optional().or(z.literal("")),
  loaction: z.string().optional(),
  portfolio: z.url("Enter a valid Link").optional().or(z.literal("")),
  reputation: z.number().optional(),
});

export type UserData = z.infer<typeof UserSchema>;
