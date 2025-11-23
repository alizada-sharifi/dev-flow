"use client";

import { useEffect, useState } from "react";
import GlobalFilter from "./GlobalFilter";
import { Frown, Loader, Tag } from "lucide-react";
import { GlobalSearchedItem } from "@/types";
import Link from "next/link";
import { globalSearch } from "@/lib/actions/general.action";
import { useSearchParams } from "next/navigation";

function GlobalResult() {
  const searchParams = useSearchParams();
  const global = searchParams.get("global");
  const type = searchParams.get("type");

  const [isLoading, setLoading] = useState(true);
  const [result, setResult] = useState([]);

  useEffect(() => {
    const fetchResult = async () => {
      setResult([]);
      setLoading(true);

      try {
        const res = await globalSearch({
          query: global as string,
          type,
        });

        setResult(res.data);
      } catch (error) {
        console.log(error);
        setResult([]);
      } finally {
        setLoading(false);
      }
    };

    if (global) {
      fetchResult();
    }
  }, [global, type]);

  const renderLink = (type: string, id: string) => {
    switch (type) {
      case "question":
        return `/questions/${id}`;
      case "answer":
        return `/questions/${id}`;
      case "user":
        return `/profile/${id}`;
      case "tag":
        return `/tags/${id}`;

      default:
        return "/";
    }
  };
  return (
    <div className="absolute top-full z-10 mt-3 w-full rounded-xl bg-light-800 dark:bg-dark-400 py-5">
      <GlobalFilter />

      <div className="my-5 h-px bg-light-700/50 dark:bg-dark-500/50" />

      <div className="space-y-5">
        <p className="text-dark-400 dark:text-white paragraph-semibold px-5">
          Top Match
        </p>

        {isLoading ? (
          <div className="flex items-center justify-center flex-col px-5">
            <Loader className="my-2 size-10 animate-spin text-primary-500" />
            <p className="text-dark-200 dark:text-light-800 body-regular">
              Browsing the whole database..
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {result.length > 0 ? (
              result.map((item: GlobalSearchedItem, index) => (
                <Link
                  href={renderLink(item.type, item.id)}
                  key={index}
                  className="flex w-full cursor-pointer items-start gap-3 px-5 py-2.5 hover:bg-light-700/50 dark:hover:bg-dark-500/50"
                >
                  <Tag size={18} className="mt-1" />

                  <div className="flex flex-col">
                    <p className="body-medium text-dark-200 dark:text-light-800 line-clamp-1">
                      {item.title}
                    </p>

                    <p className="text-dark-400 dark:text-light-500 small-medium mt-1 font-bold capitalize">
                      {item.type}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex items-center justify-center flex-col px-5">
                <Frown size={28} />
                <p className="text-dark-200 dark:text-light-800 body-regular px-5 py-2.5">
                  Oops, no results found
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default GlobalResult;
