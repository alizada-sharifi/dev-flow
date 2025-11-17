import z from "zod";

export const CreateVoteSchema = z.object({
  targetId: z.string().min(1, "Target ID is required"),
  targetType: z.enum(["question", "answer"], "Invalid target Type"),
  voteType: z.enum(["upvote", "downvote"], "Invalid vote Type"),
});

export const UpdateVoteSchema = CreateVoteSchema.extend({
  change: z.number().int().min(-1).max(1),
});

export const HasVoteSchema = CreateVoteSchema.pick({
  targetId: true,
  targetType: true,
});
