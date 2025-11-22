import Link from "next/link";

import ROUTES from "@/constants/route";
import { UserAvatar } from "@/components";

type Props = {
  _id: string;
  name: string;
  image?: string;
  username: string;
};

function UserCard({ _id, name, image, username }: Props) {
  return (
    <div className="shadow-light-100 dark:shadow-none w-full sm:w-[230px]">
      <article className="text-dark-200 dark:text-white border flex w-full flex-col items-center justify-center rounded-2xl p-8">
        <UserAvatar
          id={_id}
          name={name}
          image={image}
          className="size-[100px]"
          fallbackClassName="text-3xl tracking-widest"
        />

        <Link href={ROUTES.PROFILE(_id)}>
          <div className="mt-4 text-center">
            <h3 className="h3-bold text-dark-200 dark:text-white line-clamp-1">
              {name}
            </h3>

            <p className="body-regular text-dark-500 dark:text-light-500 mt-2">
              @{username}
            </p>
          </div>
        </Link>
      </article>
    </div>
  );
}

export default UserCard;
