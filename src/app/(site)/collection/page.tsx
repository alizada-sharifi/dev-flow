import {
  DataRender,
  Filter,
  LocalSearch,
  Pagination,
  QuestionCard,
} from "@/components";

import { RouteParams } from "@/types";
import { EMPTY_QUESTION } from "@/constants/states";
import { getSavedQuestions } from "@/lib/actions/collection.action";
import ROUTES from "@/constants/route";
import { collectionPageFilter } from "@/constants/filters";

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
      <section>
        <h1 className="h1-bold">Saved Questions</h1>
      </section>

      <section className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          placeholder="search questions..."
          route={ROUTES.COLLECTION}
        />

        <Filter
          filters={collectionPageFilter}
          containerClassName="flex"
          triggerClassName="min-h-[56px] sm:min-w-[170px]"
        />
      </section>

      <DataRender
        success={success}
        error={error}
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

      <Pagination isNext={isNext || false} page={page} />
    </>
  );
}
