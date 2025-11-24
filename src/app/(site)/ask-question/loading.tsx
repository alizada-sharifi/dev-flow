import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function loading() {
  return (
    <>
      <h1 className="h1-bold">Ask a question</h1>

      <div className="mt-9 flex flex-col gap-10">
        <div className="flex flex-col gap-1">
          <p className="gap-0.5 text-sm font-medium text-neutral-800 dark:text-light-850 mb-0">
            Question Title <span className="text-red-600">*</span>
          </p>
          <p className="text-[10px]">
            Be specific and imagine you&apos;re asking a question to another
            person.
          </p>
          <Skeleton className="max-h-12 sm:max-h-[52px] w-full" />
        </div>

        <div className="flex flex-col gap-1">
          <p className="gap-0.5 text-sm font-medium text-neutral-800 dark:text-light-850 mb-0">
            Detailed explanation of your problem
            <span className="text-red-600">*</span>
          </p>
          <p className="text-[10px]">
            Introduce the problem and expand on what you&apos;ve put in the
            title.
          </p>
          <Skeleton className="h-17 w-full" />
        </div>

        <div className="flex flex-col gap-1">
          <p className="gap-0.5 text-sm font-medium text-neutral-800 dark:text-light-850 mb-0">
            Tags <span className="text-red-600">*</span>
          </p>
          <p className="text-[10px]">
            Add up to 5 tags to describe what your question is about. Press
            Enter to add a tag.
          </p>
          <Skeleton className="max-h-12 sm:max-h-[52px] w-full" />
        </div>
      </div>

      <div className="mt-16 flex justify-end">
        <Skeleton className="w-[180px] h-9" />
      </div>
    </>
  );
}

export default loading;
