import { redirect } from "next/navigation";

import { auth } from "@/auth";
import QuestionForm from "./_components/QuestionForm";
import ROUTES from "@/constants/route";

async function AskQuestion() {
  const session = await auth();
  if (!session) return redirect(ROUTES.LOGIN);
  return (
    <>
      <h1 className="h1-bold">Ask a question</h1>

      <div className="mt-9">
        <QuestionForm />
      </div>
    </>
  );
}

export default AskQuestion;
