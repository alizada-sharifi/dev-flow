"use client";

import dynamic from "next/dynamic";

import { useRef, useState, useTransition } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Sparkles } from "lucide-react";

import { CustomButton } from "@/components";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { AnswerData, AnswerSchema } from "@/schemas/answer.schema";
import { CreateAnswer } from "@/lib/actions/answer.action";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { api } from "@/lib/api";

const Editor = dynamic(() => import("@/components/common/Editor"), {
  ssr: false,
});

type props = {
  questionId: string;
  questionTitle: string;
  questionContent: string;
};

function AnswerForm({ questionId, questionTitle, questionContent }: props) {
  const [isPending, startTransition] = useTransition();
  const [isAIAnswering, setIsAIAnswering] = useState(false);
  const editorRef = useRef<MDXEditorMethods>(null);

  const session = useSession();

  const form = useForm<AnswerData>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (data: AnswerData) => {
    startTransition(async () => {
      const result = await CreateAnswer({ questionId, content: data.content });

      if (result.success) {
        form.reset();

        toast.success("Your answer submitted successfully");

        if (editorRef.current) {
          editorRef.current.setMarkdown("");
        }
      } else {
        toast.error(
          result.error?.message ||
            "Oops, Something went wrong could you try again later"
        );
      }
    });
  };

  const generateAIAnswer = async () => {
    if (session.status !== "authenticated") {
      return toast.error("You need to be logged in to use this feature");
    }

    setIsAIAnswering(true);

    try {
      const { data, success, error } = await api.ai.getAnswer(
        questionTitle,
        questionContent
      );

      if (!success || !data) {
        toast.error(error?.message);
      }

      const formatedAnswer = String(data)
        .replace(/<br>/g, " ")
        .toString()
        .trim();

      if (editorRef.current) {
        editorRef.current.setMarkdown(formatedAnswer);

        form.setValue("content", formatedAnswer);
        form.trigger("content");
      }

      toast.success("AI answer has been genrated");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Oops, There was a problem with your request"
      );
    } finally {
      setIsAIAnswering(false);
    }
  };
  return (
    <>
      <div className="flex max-sm:flex-col justify-between sm:items-center gap-5 sm:gap-2 mt-10">
        <h5 className="paragraph-semibold text-dark-400 dark:text-white">
          Write your answer here
        </h5>

        <CustomButton
          variant="ai"
          onClick={generateAIAnswer}
          disabled={isAIAnswering}
        >
          {isAIAnswering ? (
            <>
              <Loader className="mr-2 size-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles color="#ff7000" />
              Generate AI Answer
            </>
          )}
        </CustomButton>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-6 flex w-full flex-col gap-10"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl className="mt-3">
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

          <div className="flex justify-end">
            <CustomButton
              disabled={isPending}
              type="submit"
              className="w-fit px-10"
            >
              {isPending ? (
                <>
                  <Loader className="mr-2 size-4 animate-spin" />
                  Posting...
                </>
              ) : (
                "Post Answer"
              )}
            </CustomButton>
          </div>
        </form>
      </Form>
    </>
  );
}

export default AnswerForm;
