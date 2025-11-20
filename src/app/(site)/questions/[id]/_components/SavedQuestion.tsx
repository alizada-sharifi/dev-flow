"use client";

import Image from "next/image";

import { use, useState } from "react";

import { toast } from "sonner";
import { useSession } from "next-auth/react";

import { cn } from "@/lib/utils";
import { toggleSavedQuestion } from "@/lib/actions/collection.action";
import { ActionResponse } from "@/types";

type props = {
  questionId: string;
  hasSavedQuestionPromise: Promise<ActionResponse<{ saved: boolean }>>;
};

function SavedQuestion({ questionId, hasSavedQuestionPromise }: props) {
  const session = useSession();
  const userId = session.data?.user?.id;

  const { data } = use(hasSavedQuestionPromise);
  const { saved: hasSaved } = data || {};

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (isLoading) return;
    if (!userId) {
      return toast.warning("You need to be logged in to save a question");
    }

    setIsLoading(true);

    try {
      const { success, data, error } = await toggleSavedQuestion({
        questionId,
      });

      if (!success)
        throw new Error(error?.message || "Oops, something went wrong");

      toast.success(
        `Question ${data?.saved ? "saved" : "unsaved"} successfully`
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Oops, An unexpected error occured"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Image
      src={hasSaved ? "/icons/star-filled.svg" : "/icons/star-red.svg"}
      width={18}
      height={18}
      alt="save"
      className={cn("cursor-pointer", isLoading && "opacity-50")}
      aria-label="Save qusestion"
      onClick={handleSave}
    />
  );
}

export default SavedQuestion;
