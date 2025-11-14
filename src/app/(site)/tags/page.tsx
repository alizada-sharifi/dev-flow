import { getTags } from "@/lib/actions/tag.action";

async function page() {
  const { success, data, error } = await getTags({
    page: 1,
    pageSize: 10,
  });

  const { tags } = data || {};

  console.log("TAGS", JSON.stringify(tags, null, 2));
  return <div>page</div>;
}

export default page;
