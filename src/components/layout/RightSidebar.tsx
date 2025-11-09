import ROUTES from "@/constants/route";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { TagCard } from "@/components";

const hotQuestions = [
  { _id: "1", title: "hello world" },
  { _id: "2", title: "hello world" },
  { _id: "3", title: "hello world" },
  { _id: "4", title: "hello world" },
  { _id: "5", title: "hello world" },
];

const popularTags = [
  { _id: "1", name: "react", questions: 100 },
  { _id: "2", name: "javascript", questions: 200 },
  { _id: "3", name: "next", questions: 300 },
  { _id: "4", name: "typescript", questions: 400 },
  { _id: "5", name: "tailwind", questions: 500 },
  { _id: "6", name: "html", questions: 600 },
];

function RightSidebar() {
  return (
    <section className="custom-scrollbar sticky right-0 top-0 overflow-y-auto border-l p-6 shadow-sm dark:shadow-none lg:w-[350px] h-full max-xl:hidden">
      <div className="">
        <h3 className="h3-bold text-dark-300 dark:text-white">Top Questions</h3>

        <div className="flex flex-col gap-6 w-full mt-7">
          {hotQuestions.map(({ _id, title }) => (
            <Link
              href={ROUTES.PROFILE(_id)}
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
      </div>

      <div className="mt-12">
        <h3 className="h3-bold text-dark-300 dark:text-white">Popular Tags</h3>

        <div className="flex flex-col gap-4 mt-7">
          {popularTags.map(({ _id, name, questions }) => (
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
      </div>
    </section>
  );
}

export default RightSidebar;
