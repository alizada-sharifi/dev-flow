import Link from "next/link";
import { X } from "lucide-react";

import { Badge } from "../ui/badge";
import { cn, getDeviconClassName, getTechDescription } from "@/lib/utils";
import ROUTES from "@/constants/route";

type Props = {
  _id: string;
  name: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
  remove?: boolean;
  isButton?: boolean;
  handleRemove?: () => void;
};

function TagCard({
  name,
  remove,
  showCount,
  questions,
  compact,
  isButton,
  _id,
  handleRemove,
}: Props) {
  const iconClass = getDeviconClassName(name);
  const iconDescription = getTechDescription(name);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const content = (
    <>
      <Badge className="subtle-medium bg-light-800 dark:bg-dark-500 text-light-400 dark:text-light-500 rounded-md border-0 px-4 py-2 uppercase flex gap-2">
        <div className="flex items-center justify-center space-x-2">
          <i className={cn(iconClass, "text-sm")}></i>
          <span>{name}</span>
        </div>

        {remove && (
          <span role="button" onClick={handleRemove}>
            <X size={12} className="cursor-pointer" />
          </span>
        )}
      </Badge>

      {showCount && (
        <p className="small-medium text-dark-500 dark:text-light-700">
          {questions}
        </p>
      )}
    </>
  );

  if (compact) {
    return isButton ? (
      <button
        onClick={handleClick}
        type="button"
        className="flex items-center justify-between gap-2"
      >
        {content}
      </button>
    ) : (
      <Link
        href={ROUTES.TAG(_id)}
        className="flex items-center justify-between gap-2"
      >
        {content}
      </Link>
    );
  }

  return (
    <Link href={ROUTES.TAG(_id)} className="shadow-light-100 dark:shadow-none">
      <article className=" bg-light-800/50 dark:bg-dark-300  flex w-full flex-col rounded-2xl  px-8 py-10 sm:w-[260px]">
        <div className="flex items-center justify-between gap-3">
          <div className="bg-light-800 dark:bg-dark-400 w-fit rounded-sm px-5 py-1.5">
            <p className="paragraph-semibold text-dark-300 dark:text-white">
              {name}
            </p>
          </div>
          <i className={cn(iconClass, "text-2xl")} aria-hidden="true" />
        </div>

        <p className="small-regular  text-dark-500 dark:text-light-700 mt-5 line-clamp-3 w-full">
          {iconDescription}
        </p>

        <p className="small-medium  text-dark-400 dark:text-light-500 mt-3.5">
          <span className="body-semibold primary-text-gradient mr-2.5">
            {questions}+
          </span>
          Questions
        </p>
      </article>
    </Link>
  );
}

export default TagCard;
