"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FilterType } from "@/constants/filters";
import { formUrlQuery } from "@/lib/url";

type Props = {
  containerClassName?: string;
  triggerClassName?: string;
  filters: FilterType[];
};

function Filter({ containerClassName, triggerClassName, filters }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filterParam = searchParams.get("filter");

  const handleUpdateParams = (value: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "filter",
      value,
    });
    

    router.push(newUrl, { scroll: false });
  };
  return (
    <div className={cn("relative", containerClassName)}>
      <Select
        onValueChange={handleUpdateParams}
        defaultValue={filterParam || undefined}
      >
        <SelectTrigger
          className={cn(
            "border border-light-800 dark:border-dark-300 bg-light-800 dark:bg-dark-300 body-regular no-focus px-5 py-2.5 w-full",
            triggerClassName
          )}
          aria-label="Filter Options"
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Filter..." />
          </div>
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {filters.map((item) => (
              <SelectItem value={item.value} key={item.value}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default Filter;
