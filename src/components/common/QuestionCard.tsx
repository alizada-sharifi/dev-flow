import Link from "next/link";

import { getTimeStamp } from "@/lib/utils";
import ROUTES from "@/constants/route";
import { CustomActions, Metric, TagCard } from "@/components";
import placeholderImage from "@/../public/images/placeholder.svg";

import { QuestionType, TagType } from "@/types";

type props = {
  question: QuestionType;
  showActionsButtons?: boolean;
};

export default function QuestionCard({
  question: { _id, title, upvotes, answers, author, createdAt, tags, views },
  showActionsButtons = false,
}: props) {
  return (
    <div className="bg-white dark:dark-gradient shadow-light-100 dark:shadow-dark-100 rounded-[10px] p-9 sm:px-11 ">
      <div className="flex flex-col-reverse items-center justify-between gap-5 sm:flex-row">
        <div className="flex-1">
          <span className="subtle-regular text-dark-400 dark:text-light-700 line-clamp-1 flex sm:hidden">
            {getTimeStamp(createdAt)}
          </span>

          <Link href={ROUTES.QUESTIONS(_id)}>
            <h3 className="sm:h3-semibold base-semibold text-dark-200 dark:text-white line-clamp-1 flex-1 ">
              {title}
            </h3>
          </Link>
        </div>

        {showActionsButtons && <CustomActions type="question" itemID={_id} />}
      </div>

      <div className="mt-3.5 flex w-full flex-wrap gap-2">
        {tags.map((tag: TagType) => (
          <TagCard key={tag._id} _id={tag._id} name={tag.name} compact />
        ))}
      </div>

      <div className="flex items-center justify-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.image || placeholderImage}
          alt={author.name}
          title={`. asked ${getTimeStamp(createdAt)}`}
          href={ROUTES.PROFILE(author._id)}
          value={author.name}
          textStyles="body-meduim text-dark-400 dark:text-light-700"
          isAuthor
          imgContainerStyle={author.image ? "" : "bg-gray-200 p-1 rounded-full"}
        />

        <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
          <Metric
            imgUrl="/icons/like.svg"
            alt="Like"
            title="Votes"
            value={upvotes}
            textStyles="small-medium text-dark-400 dark:text-light-700"
          />

          <Metric
            imgUrl="/icons/message.svg"
            alt="answers"
            title="Answers"
            value={answers}
            textStyles="small-medium text-dark-400 dark:text-light-700"
          />

          <Metric
            imgUrl="/icons/eye.svg"
            alt="view"
            title="Views"
            value={views}
            textStyles="small-medium text-dark-400 dark:text-light-800"
          />
        </div>
      </div>
    </div>
  );
}
