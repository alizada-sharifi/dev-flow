import { DataRender, LocalSearch, QuestionCard } from "@/components";

import { RouteParams } from "@/types";
import { EMPTY_QUESTION } from "@/constants/states";
import { getSavedQuestions } from "@/lib/actions/collection.action";
import ROUTES from "@/constants/route";

export default async function Collections({ searchParams }: RouteParams) {
  const { page, pageSize, query, filter } = await searchParams;

  const { success, data, error } = await getSavedQuestions({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query: query || "",
    filter: filter || "",
  });

  const { collection, isNext } = data || {};

  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold">Saved Questions</h1>
      </section>

      <section className="mt-11">
        <LocalSearch
          placeholder="search questions..."
          route={ROUTES.COLLECTION}
        />
      </section>

      <DataRender
        success={success}
        error={error}
        // empty={EMPTY_QUESTION}
        empty={EMPTY_QUESTION}
        data={collection}
        render={(collection) => (
          <div className="mt-10 flex w-full flex-col gap-6">
            {collection.map((item) => (
              <QuestionCard key={item._id} question={item.question} />
            ))}
          </div>
        )}
      />
    </>
  );
}
