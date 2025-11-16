import Link from "next/link";
import { redirect } from "next/navigation";
import { after } from "next/server";

import { Metric, TagCard } from "@/components";
import { Preview } from "@/components/common/Preview";
import UserAvatar from "@/components/layout/UserAvatar";

import { getQuestion, incrementViews } from "@/lib/actions/question.action";

import ROUTES from "@/constants/route";
import { formatNumber, getTimeStamp } from "@/lib/utils";
import { RouteParams, TagType } from "@/types";
import AnswerForm from "./_components/AnswerForm";
import { getAnswers } from "@/lib/actions/answer.action";
import Answers from "./_components/Answers";

async function QuestionsDetail({ params }: RouteParams) {
  const { id } = await params;
  const { success, data: question } = await getQuestion({ questionId: id });

  after(async () => {
    await incrementViews({ questionId: id });
  });

  if (!question || !success) return redirect("/404");

  const {
    success: isAnswerSuccess,
    data: answerResult,
    error: answerError,
  } = await getAnswers({
    questionId: id,
    filter: "latest",
    page: 1,
    pageSize: 10,
  });

  const { answers, author, createdAt, views, tags, content, title } = question;
  return (
    <>
      <div className="flex items-center justify-start w-full flex-col mt-7.5">
        <div className="flex w-full flex-col-reverse justify-between">
          <div className="flex items-center justify-start gap-1">
            <UserAvatar
              id={author._id}
              name={author.name}
              className="size-[22px]"
              fallbackClassName="text-[10px]"
            />

            <Link href={ROUTES.PROFILE(author._id)}>
              <p className="paragraph-semibold text-dark-300 dark:text-light-700">
                {author.name}
              </p>
            </Link>
          </div>

          <div className="flex justify-end">
            <p>Votes</p>
          </div>
        </div>

        <h2 className="h2-semibold text-dark-200 dark:text-white mt-3.5 w-full">
          {title}
        </h2>
      </div>

      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/icons/clock.svg"
          alt="clock Icon"
          value={`asked ${getTimeStamp(new Date(createdAt))}`}
          textStyles="small-regular text-dark-400 dark:text-light-700 "
        />

        <Metric
          imgUrl="/icons/message.svg"
          alt="message Icon"
          value={answers}
          textStyles="small-regular text-dark-400 dark:text-light-700 "
        />

        <Metric
          imgUrl="/icons/eye.svg"
          alt="eye Icon"
          value={formatNumber(views)}
          textStyles="small-regular text-dark-400 dark:text-light-700 "
        />
      </div>

      <Preview content={content} />

      <div className="mt-8 flex flex-wrap gap-2">
        {tags.map((tag: TagType) => (
          <TagCard key={tag._id} _id={tag._id} name={tag.name} compact />
        ))}
      </div>

      <section className="my-5">
        <Answers
          totalAnswers={answerResult?.totalAnswers || 0}
          success={isAnswerSuccess}
          data={answerResult?.answers}
          error={answerError}
        />
      </section>

      <section className="mb-5">
        <AnswerForm questionId={question._id} />
      </section>
    </>
  );
}

export default QuestionsDetail;
