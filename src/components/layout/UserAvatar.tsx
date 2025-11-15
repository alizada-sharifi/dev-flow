import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ROUTES from "@/constants/route";
import { cn } from "@/lib/utils";

type Params = {
  id: string;
  name: string;
  image?: string | null;
  className?: string;
  fallbackClassName?: string;
};

function UserAvatar({ id, name, image, className, fallbackClassName }: Params) {
  const fallbackName = name
    .split(" ")
    .map((word: string) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  return (
    <Link href={ROUTES.PROFILE(id)}>
      <Avatar className={cn("size-9", className)}>
        {image ? (
          <AvatarImage
            src={image!}
            alt={name}
            className="object-cover"
            width={36}
            height={36}
          />
        ) : (
          <AvatarFallback
            className={cn(
              "primary-gradient font-space-grotesk font-bold tracking-wider text-white",
              fallbackClassName
            )}
          >
            {fallbackName}
          </AvatarFallback>
        )}
      </Avatar>
    </Link>
  );
}

export default UserAvatar;
