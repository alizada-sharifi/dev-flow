"use client";

import Image from "next/image";

import { use, useState } from "react";

import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { createVote } from "@/lib/actions/votes.action";
import { cn, formatNumber } from "@/lib/utils";

import { ActionResponse } from "@/types";
import { HasVoteResponse } from "@/types/action";

type Prop = {
  upvotes: number;
  downvotes: number;
  hasVotedPromise: Promise<ActionResponse<HasVoteResponse>>;
  targetId: string;
  targetType: "question" | "answer";
};

function Votes({
  upvotes,
  downvotes,
  hasVotedPromise,
  targetId,
  targetType,
}: Prop) {
  const session = useSession();
  const userId = session.data?.user?.id;
  const [isLoading, setIsLoading] = useState(false);

  const { success, data } = use(hasVotedPromise);
  const { isUpvoted, isdownvoted } = data || {};

  const handleVote = async (voteType: "upvote" | "downvote") => {
    if (!userId) {
      return toast.warning("Only logged in users can vote");
    }

    setIsLoading(true);

    try {
      const result = await createVote({
        targetId,
        targetType,
        voteType,
      });

      if (!result.success) {
        toast.error(result.error?.message || "Oops, failed to vote");
      }

      const message =
        voteType === "downvote"
          ? `Downvote ${!isdownvoted ? "added" : "revmoved"} successfully`
          : `Upvote ${!isUpvoted ? "added" : "revmoved"} successfully`;

      toast.success(message);
    } catch (e) {
      toast.error(
        "Oops,An error occurred while voting. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="flex items-center justify-center gap-1.5">
        <Image
          src={
            isUpvoted && success ? "/icons/upvoted.svg" : "/icons/upvote.svg"
          }
          width={18}
          height={18}
          alt="upvote"
          className={cn("cursor-pointer", isLoading && "opacity-50")}
          aria-label="Upvote"
          onClick={() => !isLoading && handleVote("upvote")}
        />

        <div className="flex items-center justify-center bg-light-700 dark:bg-dark-400 min-w-5 rounded-sm p-1">
          <p className="subtle-medium text-dark-400 dark:text-white">
            {formatNumber(upvotes)}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-1.5">
        <Image
          src={
            success && isdownvoted
              ? "/icons/downvoted.svg"
              : "/icons/downvote.svg"
          }
          width={18}
          height={18}
          alt="DownVote"
          className={cn("cursor-pointer", isLoading && "opacity-50")}
          aria-label="DownVote"
          onClick={() => !isLoading && handleVote("downvote")}
        />

        <div className="flex items-center justify-center bg-light-700 dark:bg-dark-400 min-w-5 rounded-sm p-1">
          <p className="subtle-medium text-dark-400 dark:text-white">
            {formatNumber(downvotes)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Votes;
