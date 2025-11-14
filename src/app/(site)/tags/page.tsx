import { DataRender, LocalSearch, TagCard } from "@/components";
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

  const { tags } = data || {};

  return (
    <>
      <h1 className="h1-bold text-3xl">Tags</h1>

      <section className="mt-11">
        <LocalSearch route={ROUTES.TAGS} placeholder="Search by tag name..." />
      </section>

      <DataRender
        success={success}
        data={tags}
        error={error}
        empty={EMPTY_TAGS}
        render={(tags) => (
          <div className="mt-10 flex w-full flex-wrap gap-4">
            {tags.map((tag) => (
              <TagCard key={tag._id} {...tag} />
            ))}
          </div>
        )}
      />
    </>
  );
}

export default page;
