"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { formUrlQuery, removeKeysFromUrlQuery } from "@/lib/url";
import { cn } from "@/lib/utils";

const filters = [
  {
    name: "Newest",
    value: "newest",
  },
  {
    name: "Unanswered",
    value: "unanswered",
  },
  {
    name: "Popular",
    value: "popular",
  },
  {
    name: "Recommended",
    value: "recommended",
  },
];

function HomeFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterParams = searchParams.get("filter");
  const [active, setActive] = useState(filterParams || "");

  const handleClickType = (filter: string) => {
    let newUrl = "";
    if (filter === active) {
      setActive("");
      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["filter"],
      });
    } else {
      setActive(filter);
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: filter.toLowerCase(),
      });
    }
    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="mt-10 hidden md:flex flex-wrap gap-3">
      {filters.map((filter) => (
        <Button
          onClick={() => handleClickType(filter.value)}
          key={filter.value}
          className={cn(
            "body-meduim rounded-lg px-6 py-3 capitalize shadow-none cursor-pointer",
            active === filter.value
              ? "bg-primary-100 text-primary-500 hover:bg-primary-100 dark:bg-dark-400 dark:text-primary-500 dark:hover:bg-dark-400"
              : "bg-light-800 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-300"
          )}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
}

export default HomeFilter;
