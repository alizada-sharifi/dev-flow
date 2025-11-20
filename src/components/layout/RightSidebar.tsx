import Link from "next/link";

import { ChevronRight } from "lucide-react";

import ROUTES from "@/constants/route";
import { DataRender, TagCard } from "@/components";
import { getHotQuestions } from "@/lib/actions/question.action";
import { EMPTY_HOT_QUESTIONS, EMPTY_HOT_TAGS } from "@/constants/states";
import { getTopTags } from "@/lib/actions/tag.action";

async function RightSidebar() {
  const [
    { success, data: hotQuestions, error },
    { success: tagSuccess, data, error: tagError },
  ] = await Promise.all([getHotQuestions(), getTopTags()]);

  return (
    <section className="custom-scrollbar sticky right-0 top-0 overflow-y-auto border-l p-6 shadow-sm dark:shadow-none lg:w-[350px] h-full max-xl:hidden">
      <div>
        <h3 className="h3-bold text-dark-300 dark:text-white">Top Questions</h3>

        <DataRender
          success={success}
          error={error}
          empty={EMPTY_HOT_QUESTIONS}
          data={hotQuestions}
          render={(hotQuestions) => (
            <div className="flex flex-col gap-6 w-full mt-7">
              {hotQuestions.map(({ _id, title }) => (
                <Link
                  href={ROUTES.QUESTIONS(_id)}
                  key={_id}
                  className="flex items-center justify-between gap-7 cursor-pointer"
                >
                  <p className="body-medium text-dark-500 dark:text-light-700">
                    {title}
                  </p>

                  <ChevronRight />
                </Link>
              ))}
            </div>
          )}
        />
      </div>

      <div className="mt-12">
        <h3 className="h3-bold text-dark-300 dark:text-white">Popular Tags</h3>

        <DataRender
          success={tagSuccess}
          error={tagError}
          empty={EMPTY_HOT_TAGS}
          data={data}
          render={(hotTags) => (
            <div className="flex flex-col gap-4 mt-7">
              {hotTags.map(({ _id, name, questions }) => (
                <TagCard
                  key={_id}
                  _id={_id}
                  name={name}
                  questions={questions}
                  compact
                  showCount
                />
              ))}
            </div>
          )}
        />
      </div>
    </section>
  );
}

export default RightSidebar;
