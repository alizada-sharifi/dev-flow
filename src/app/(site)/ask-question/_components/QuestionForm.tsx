"use client";

import dynamic from "next/dynamic";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { useRef } from "react";
import { MDXEditorMethods } from "@mdxeditor/editor";

const Editor = dynamic(() => import("@/components/common/Editor"), {
  ssr: false,
});

function QuestionForm() {
  const editorRef = useRef<MDXEditorMethods>(null);

  const form = useForm<AskQuestionData>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  const onSubmit = (data: AskQuestionData) => {
    console.log("✅ Submitted:", data);
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
          <CustomButton type="submit" className="w-fit px-10">
            Submit
          </CustomButton>
        </div>
      </form>
    </Form>
  );
}

export default QuestionForm;
