import { RouteParams } from "@/types";

async function QuestionsDetail({ params }: RouteParams) {
  const { id } = await params;
  return <div>QuestionDetail page : {id}</div>;
}

export default QuestionsDetail;
