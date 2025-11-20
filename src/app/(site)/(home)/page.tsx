import Link from "next/link";

import { CustomButton, DataRender, Filter, LocalSearch } from "@/components";
import ROUTES from "@/constants/route";
import HomeFilter from "./_components/HomeFilter";
import { QuestionCard } from "@/components";
import { getQuestions } from "@/lib/actions/question.action";
import { RouteParams } from "@/types";
import { EMPTY_QUESTION } from "@/constants/states";
import { homePageFilters } from "@/constants/filters";

export default async function Home({ searchParams }: RouteParams) {
  const { page, pageSize, query, filter } = await searchParams;

  const { success, error, data } = await getQuestions({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query: query || "",
    filter: filter || "",
  });

  const { questions } = data || {};

  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold">All Questions</h1>

        <CustomButton className="sm:w-fit py-6!">
          <Link href={ROUTES.ASKQUESTION}>Ask a Question</Link>
        </CustomButton>
      </section>

      <section className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch placeholder="search questions..." route="/" />

        <Filter
          filters={homePageFilters}
          containerClassName="max-md:flex hidden"
          triggerClassName="min-h-[56px] sm:min-w-[170px]"
        />
      </section>

      <HomeFilter />

      <DataRender
        success={success}
        error={error}
        empty={EMPTY_QUESTION}
        data={questions}
        render={(questions) => (
          <div className="mt-10 flex w-full flex-col gap-6">
            {questions.map((question) => (
              <QuestionCard key={question._id} question={question} />
            ))}
          </div>
        )}
      />
    </>
  );
}
