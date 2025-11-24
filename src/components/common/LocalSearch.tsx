"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";

import { Search } from "lucide-react";

import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { formUrlQuery, removeKeysFromUrlQuery } from "@/lib/url";

type Props = {
  placeholder?: string;
  className?: string;
  route: string;
};

function LocalSearch({ placeholder = "search...", className, route }: Props) {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [searchQuery, setSearchQuery] = useState(query);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: searchQuery,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ["query"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, router, searchParams, route, pathname]);
  return (
    <div
      className={cn(
        "bg-light-800 dark:bg-dark-200 flex min-h-14 grow items-center gap-4 rounded-[10px] px-4",
        className
      )}
    >
      <Search className="cursor-pointer" color="#1e2939" />

      <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="paragraph-regular no-focus placeholder:text-shadow-dark-400 dark:text-light-700 border-0 outline-0 shadow-none bg-transparent!"
      />
    </div>
  );
}

export default LocalSearch;
