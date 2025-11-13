import QuestionForm from "@/app/(site)/ask-question/_components/QuestionForm";
import { auth } from "@/auth";
import ROUTES from "@/constants/route";
import { getQuestion } from "@/lib/actions/question.action";
import { RouteParams } from "@/types";
import { notFound, redirect } from "next/navigation";

async function EditQuestion({ params }: RouteParams) {
  const { id } = await params;
  if (!id) return notFound();

  const session = await auth();
  if (!session) return redirect(ROUTES.LOGIN);

  const { data: question, success } = await getQuestion({ questionId: id });
  if (!success) return notFound();

  if (question?.author.toString() !== session.user?.id)
    redirect(ROUTES.QUESTIONS(id));

  return <QuestionForm question={question} isEdit />;
}

export default EditQuestion;
