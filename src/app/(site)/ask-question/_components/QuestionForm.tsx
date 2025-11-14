"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import { useRef, useTransition } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { toast } from "sonner";

import { CustomButton, CustomInput } from "@/components";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  type AskQuestionData,
  AskQuestionSchema,
} from "@/schemas/ask-question.schema";
import TagInput from "./TagInput";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { createQuestion, editQuestion } from "@/lib/actions/question.action";
import ROUTES from "@/constants/route";
import { QuestionType } from "@/types";

const Editor = dynamic(() => import("@/components/common/Editor"), {
  ssr: false,
});

type Params = {
  question?: QuestionType | null;
  isEdit?: boolean;
};

function QuestionForm({ question, isEdit = false }: Params) {
  const router = useRouter();
  const editorRef = useRef<MDXEditorMethods>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<AskQuestionData>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: question?.title || "",
      content: question?.content || "",
      tags: question?.tags.map((tag) => tag.name) || [],
    },
  });

  const onSubmit = async (data: AskQuestionData) => {
    startTransition(async () => {
      if (isEdit && question) {
        const result = await editQuestion({
          questionId: question?._id,
          ...data,
        });

        if (result.success) {
          toast.success("Question updated successfully");
          if (result.data) router.push(ROUTES.QUESTIONS(result.data._id as string));
        } else {
          toast.error(result.error?.message || "Oops, Something went wrong");
        }
        return;
      }
      const result = await createQuestion(data);

      if (result.success) {
        toast.success("Question created successfully");
        if (result.data) router.push(ROUTES.QUESTIONS(result.data._id));
      } else {
        toast.error(result.error?.message || "Oops, Something went wrong");
      }
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-10"
      >
        <CustomInput
          control={form.control}
          name="title"
          label="Question Title"
          description="Be specific and imagine you're asking a question to another person."
          required
          placeholder="Enter your title"
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="gap-0.5 text-sm font-medium text-neutral-800 dark:text-light-850 mb-0">
                Detailed explanation of your problem
                <span className="text-red-600">*</span>
              </FormLabel>

              <FormDescription className="text-[10px]">
                Introduce the problem and expand on what you&apos;ve put in the
                title.
              </FormDescription>

              <FormControl>
                <Editor
                  value={field.value}
                  editorRef={editorRef}
                  fieldChange={field.onChange}
                />
              </FormControl>

              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <TagInput
          control={form.control}
          name="tags"
          label="Tags"
          description="Add up to 5 tags to describe what your question is about. Press Enter to add a tag."
          required
          maxTags={5}
        />

        <div className="mt-16 flex justify-end">
          <CustomButton
            disabled={isPending}
            type="submit"
            className="w-fit px-10"
          >
            {isPending ? (
              <>
                <Loader className="mr-2 size-4 animate-spin" />
                <span>Submitting</span>
              </>
            ) : isEdit ? (
              "Edit"
            ) : (
              "Ask a Question"
            )}
          </CustomButton>
        </div>
      </form>
    </Form>
  );
}

export default QuestionForm;
