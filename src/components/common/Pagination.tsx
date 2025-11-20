"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import CustomButton from "./CustomButton";
import { formUrlQuery } from "@/lib/url";

type Prop = {
  page: number | undefined | string;
  isNext: boolean;
  className?: string;
};

function Pagination({ page = 1, isNext, className }: Prop) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handlePagination = (type: "prev" | "next") => {
    const nextPageNum = type === "prev" ? Number(page) - 1 : Number(page) + 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: nextPageNum.toString(),
    });

    router.push(newUrl);
  };
  return (
    <div
      className={cn(
        "flex w-full items-center justify-center gap-2 mt-5",
        className
      )}
    >
      {Number(page) > 1 && (
        <CustomButton
          onClick={() => handlePagination("prev")}
          variant="pagination"
        >
          <p className="body-medium text-dark-200 dark:text-light-800">Prev</p>
        </CustomButton>
      )}

      <div className="flex items-center justify-center rounded-md bg-primary-500 px-3.5 py-2">
        <p className="body-semibold text-white">{page}</p>
      </div>

      {isNext && (
        <CustomButton
          onClick={() => handlePagination("next")}
          variant="pagination"
        >
          <p className="body-medium text-dark-200 dark:text-light-800">next</p>
        </CustomButton>
      )}
    </div>
  );
}

export default Pagination;
