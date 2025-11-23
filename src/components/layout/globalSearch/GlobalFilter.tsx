"use client";

import { GlobalSearchFilters } from "@/constants/filters";
import { formUrlQuery } from "@/lib/url";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

function GlobalFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const typeParams = searchParams.get("type");
  const [active, setActive] = useState(typeParams || "");

  const handleTypeClick = (item: string) => {
    let newUrl = "";

    if (active === item) {
      setActive("");

      newUrl = formUrlQuery({
        params: searchParams.toString(),
        value: "",
        key: "type",
      });

      router.push(newUrl, { scroll: false });
    } else {
      setActive(item);

      newUrl = formUrlQuery({
        key: "type",
        params: searchParams.toString(),
        value: item.toLowerCase(),
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="flex items-center gap-5 px-5">
      <p className="text-dark-400 dark:text-white body-medium">Type:</p>

      <div className="flex gap-3">
        {GlobalSearchFilters.map((item) => (
          <button
            type="button"
            key={item.value}
            className={cn(
              "border small-medium rounded-2xl px-5 py-2.5 capitalize cursor-pointer transition-all duration-150",
              active === item.value
                ? "bg-primary-500 text-white"
                : "bg-light-700 text-dark-400 hover:text-primary-500 dark:bg-dark-500 dark:text-light-800 dark:hover:text-primary-500"
            )}
            onClick={() => handleTypeClick(item.value)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default GlobalFilter;
