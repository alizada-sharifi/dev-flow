"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CustomButton, CustomInput } from "@/components";
import { Form } from "@/components/ui/form";
import {
  type AskQuestionData,
  AskQuestionSchema,
} from "@/schemas/ask-question.schema";
import TagInput from "./TagInput";

function QuestionForm() {
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

        <CustomInput
          control={form.control}
          name="content"
          label="Detailed explanation of your problem"
          description="Introduce the problem and expand on what you've put in the title."
          required
          placeholder="Enter your description"
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
