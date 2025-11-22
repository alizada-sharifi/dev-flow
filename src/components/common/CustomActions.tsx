"use client";

import { cn } from "@/lib/utils";
import { SquarePen, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteQuestion } from "@/lib/actions/question.action";
import { deleteAnswer } from "@/lib/actions/answer.action";

type props = {
  type: "question" | "answer";
  itemID: string;
};

function CustomActions({ type, itemID }: props) {
  const router = useRouter();

  const handleEdit = async () => {
    router.push(`/questions/${itemID}/edit`);
  };

  const handleDelete = async () => {
    if (type === "question") {
      await deleteQuestion({ questionId: itemID });

      toast.success("Question deleted successfully");
    } else if (type === "answer") {
      await deleteAnswer({ answerId: itemID });
      toast.success("Answer deleted successfully");
    }
  };

  return (
    <div
      className={cn(
        "flex items-center justify-end gap-3 max-sm:w-full",
        type === "answer" && "gap-0 justify-center"
      )}
    >
      {type === "question" && (
        <SquarePen
          size={14}
          className="cursor-pointer text-link-100"
          onClick={handleEdit}
        />
      )}

      <AlertDialog>
        <AlertDialogTrigger>
          <Trash size={14} className="text-red-700 cursor-pointer" />
        </AlertDialogTrigger>

        <AlertDialogContent className="bg-light-800 dark:bg-dark-300">
          <AlertDialogHeader>
            <AlertDialogTitle>Are You Absolutely Sure?</AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your{" "}
              {type === "question" ? "question" : "answer"} and remove it from
              our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="border-primary-100! bg-primary-500 text-light-800 cursor-pointer"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default CustomActions;
