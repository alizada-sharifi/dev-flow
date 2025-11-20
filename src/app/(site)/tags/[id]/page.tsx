import {
  DataRender,
  LocalSearch,
  Pagination,
  QuestionCard,
} from "@/components";
import ROUTES from "@/constants/route";
import { EMPTY_QUESTION } from "@/constants/states";
import { getTagQuestions } from "@/lib/actions/tag.action";
import { RouteParams } from "@/types";

async function TagDetails({ params, searchParams }: RouteParams) {
  const { id } = await params;
  const { page, pageSize, query } = await searchParams;

  const { success, data, error } = await getTagQuestions({
    tagId: id,
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query,
  });

  const { isNext, questions, tag } = data || {};

  console.log(tag?.name[0]);
  console.log(tag?.name.slice(1));

  console.log(`${tag?.name[0].toUpperCase()}${tag?.name.slice(1)}`);

  return (
    <>
      <h1 className="h1-bold">
        {tag?.name ? tag.name[0].toUpperCase() + tag.name.slice(1) : "Tag"}
      </h1>

      <section className="mt-11">
        <LocalSearch route={ROUTES.TAG(id)} placeholder="Search questions..." />
      </section>

      <DataRender
        data={questions}
        empty={EMPTY_QUESTION}
        success={success}
        error={error}
        render={(questions) => (
          <div className="mt-10 flex w-full flex-col gap-6">
            {questions.map((question) => (
              <QuestionCard key={question._id} question={question} />
            ))}
          </div>
        )}
      />

      <Pagination isNext={isNext} page={page} />
    </>
  );
}

export default TagDetails;
