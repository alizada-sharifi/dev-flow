import Link from "next/link";

import { Preview } from "@/components/common/Preview";
import UserAvatar from "@/components/layout/UserAvatar";
import ROUTES from "@/constants/route";
import { getTimeStamp } from "@/lib/utils";
import { AnswerType } from "@/types";

interface props extends AnswerType {}

function AnswerCard({ _id, author, createdAt, content }: props) {
  return (
    <article className="border-b py-10">
      <span id={JSON.stringify(_id)} className="mt-[-140px] pb-35 block" />

      <div className="mb-5 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <div className="flex flex-1 items-start gap-1 sm:items-center">
          <UserAvatar
            id={author._id}
            name={author.name}
            image={author.image}
            className="size-5 object-cover max-sm:mt-2"
          />

          <Link
            href={ROUTES.PROFILE(author._id)}
            className="flex max-sm:flex-col sm:items-center max-sm:ml-1.5"
          >
            <p className="body-semibold text-dark-300 dark:text-light-700">
              {author.name || "Anonymous"}
            </p>

            <p className="small-regular text-dark-400 dark:text-light-500 ml-0.5 mt-0.5 line-clamp-1">
              <span className="max-sm:hidden">.</span>
              answered {getTimeStamp(createdAt)}
            </p>
          </Link>
        </div>

        <div className="flex justify-end">votes</div>
      </div>

      <Preview content={content} />
    </article>
  );
}

export default AnswerCard;
