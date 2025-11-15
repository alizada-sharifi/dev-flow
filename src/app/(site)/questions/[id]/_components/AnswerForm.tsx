"use client";

import dynamic from "next/dynamic";

import { useRef, useState } from "react";

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

const Editor = dynamic(() => import("@/components/common/Editor"), {
  ssr: false,
});

function AnswerForm() {
  const [isAnswering, setIsAnswering] = useState(false);
  const [isAIAnswering, setIsAIAnswering] = useState(false);
  const editorRef = useRef<MDXEditorMethods>(null);

  const form = useForm<AnswerData>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (data: AnswerData) => {
    console.log(data);
  };
  return (
    <>
      <div className="flex max-sm:flex-col justify-between sm:items-center gap-5 sm:gap-2 mt-10">
        <h5 className="paragraph-semibold text-dark-400 dark:text-white">
          Write your answer here
        </h5>

        <CustomButton variant="ai">
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
              disabled={isAnswering}
              type="submit"
              className="w-fit px-10"
            >
              {isAnswering ? (
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
