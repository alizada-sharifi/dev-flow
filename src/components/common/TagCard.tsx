import Link from "next/link";
import { X } from "lucide-react";

import { Badge } from "../ui/badge";
import { cn, getDeviconClassName } from "@/lib/utils";
import ROUTES from "@/constants/route";

type Props = {
  _id: string;
  name: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
  remove?: boolean;
  isButton?: boolean;
};

function TagCard({
  name,
  remove,
  showCount,
  questions,
  compact,
  isButton,
  _id,
}: Props) {
  const iconClass = getDeviconClassName(name);

  const content = (
    <>
      <Badge className="subtle-medium bg-light-800 dark:bg-dark-500 text-light-400 dark:text-light-500 rounded-md border-0 px-4 py-2 uppercase flex gap-2">
        <div className="flex items-center justify-center space-x-2">
          <i className={cn(iconClass, "text-sm")}></i>
          <span>{name}</span>
        </div>

        {remove && <X size={12} />}
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
      <button type="button" className="flex items-center justify-between gap-2">
        {content}
      </button>
    ) : (
      <Link
        href={ROUTES.TAGS(_id)}
        className="flex items-center justify-between gap-2"
      >
        {content}
      </Link>
    );
  }
}

export default TagCard;
