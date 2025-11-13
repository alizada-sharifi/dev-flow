import Link from "next/link";

import { CustomButton, LocalSearch } from "@/components";
import ROUTES from "@/constants/route";
import HomeFilter from "./_components/HomeFilter";
import QuestionCard from "./_components/QuestionCard";
import { getQuestions } from "@/lib/actions/question.action";
import { RouteParams } from "@/types";

export default async function Home({ searchParams }: RouteParams) {
  const { page, pageSize, query, filter } = await searchParams;

  const { success, error, data } = await getQuestions({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query: query || "",
    filter: filter || "",
  });

  const { questions } = data || {};

  // const filteredQuestions = questions.filter((question) => {
  //   const matchesQuery = question.title.toLowerCase().includes(query);

  //   const matchesFilter = filter
  //     ? question.tags[0].name.toLowerCase() === filter.toLowerCase()
  //     : true;

  //   return matchesQuery && matchesFilter;
  // });
  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center mt-6">
        <h1 className="h1-bold">All Questions</h1>

        <CustomButton className="sm:w-fit py-6!">
          <Link href={ROUTES.ASKQUESTION}>Ask a Question</Link>
        </CustomButton>
      </section>

      <section className="mt-11">
        <LocalSearch placeholder="search questions..." route="/" />

        <HomeFilter />

        {success ? (
          <div className="flex flex-col w-full mt-10 gap-6">
            {questions && questions.length > 0 ? (
              questions.map((question) => (
                <QuestionCard key={question._id} question={question} />
              ))
            ) : (
              <div className="mt-10 flex w-full items-center justify-center">
                <p className="text-dark-400 dark:text-light-700">
                  No questions found
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-10 flex w-full items-center justify-center">
            <p className="text-dark-400 dark:text-light-700">
              {error?.message || "Failed to fetch questions"}
            </p>
          </div>
        )}
      </section>
    </>
  );
}
