import z from "zod";

export const ProfileSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters"),
  username: z.string().min(2, "Username must be at least 2 characters"),
  portfolio: z.url("Portfolio must be a valid URL").optional(),
  bio: z
    .string()
    .min(3, "Bio must be at least 3 characters.")
    .max(160, "Bio must be at most 160 characters")
    .optional(),
  location: z
    .string()
    .min(2, "Location must be at least 2 characters")
    .optional(),
});

export type ProfileSchemaType = z.infer<typeof ProfileSchema>;
