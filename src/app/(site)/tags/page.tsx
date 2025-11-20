import {
  DataRender,
  Filter,
  LocalSearch,
  Pagination,
  TagCard,
} from "@/components";
import { tagsPageFilters } from "@/constants/filters";
import ROUTES from "@/constants/route";
import { EMPTY_TAGS } from "@/constants/states";
import { getTags } from "@/lib/actions/tag.action";
import { RouteParams } from "@/types";

async function page({ searchParams }: RouteParams) {
  const { page, pageSize, query, filter } = await searchParams;

  const { success, data, error } = await getTags({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query,
    filter,
  });

  const { tags, isNext } = data || {};

  return (
    <>
      <h1 className="h1-bold text-3xl">Tags</h1>

      <section className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch route={ROUTES.TAGS} placeholder="Search by tag name..." />

        <Filter
          filters={tagsPageFilters}
          triggerClassName="min-h-[56px] sm:min-w-[170px]"
        />
      </section>

      <DataRender
        success={success}
        data={tags}
        error={error}
        empty={EMPTY_TAGS}
        render={(tags) => (
          <div className="mt-10 flex flex-wrap gap-4">
            {tags.map((tag) => (
              <TagCard key={tag._id} {...tag} />
            ))}
          </div>
        )}
      />

      <Pagination isNext={isNext || false} page={page} />
    </>
  );
}

export default page;
