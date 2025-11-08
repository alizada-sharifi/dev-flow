import Link from "next/link";

import { CustomButton, LocalSearch } from "@/components";
import ROUTES from "@/constants/route";
import HomeFilter from "./_components/HomeFilter";

const questions = [
  {
    _id: "1",
    title: "How to learn React?",
    content: "I want to learn React. Any suggestions?",
    tags: [
      { _id: "1", name: "react" },
      {
        _id: "2",
        name: "frontend",
      },
    ],
    author: { _id: "1", name: "John Doe", image: "/girl.png" },
    createdAt: new Date("2020-1-1"),
    upvotes: 10,
    downvotes: 2,
    answers: 2,
    views: 100,
  },
  {
    _id: "2",
    title: "How to learn next?",
    content: "I want to learn React. Any suggestions?",
    tags: [
      { _id: "1", name: "react" },
      {
        _id: "2",
        name: "frontend",
      },
    ],
    author: { _id: "1", name: "John Doe", image: "/girl.png" },
    createdAt: new Date("2020-1-1"),
    upvotes: 10,
    downvotes: 2,
    answers: 2,
    views: 100,
  },
];

type SearchParams = {
  searchParams: Promise<{ [key: string]: string }>;
};

export default async function Home({ searchParams }: SearchParams) {
  const { query = "", filter = "" } = await searchParams;

  const filteredQuestions = questions.filter((question) => {
    const matchesQuery = question.title.toLowerCase().includes(query);

    const matchesFilter = filter
      ? question.tags[0].name.toLowerCase() === filter.toLowerCase()
      : true;

    return matchesQuery && matchesFilter;
  });
  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center mt-6">
        <h1 className="h1-bold">All Questions</h1>

        <CustomButton className="sm:w-fit py-6!">
          <Link href={ROUTES.ASKQUESTION}>Ask a Question</Link>
        </CustomButton>
      </section>

      <section className="mt-11">
        <LocalSearch placeholder="search questions..." route="/" />

        <HomeFilter />

        <div className="flex flex-col w-full mt-10 gap-6">
          {filteredQuestions.map((question) => (
            <h1 key={question._id}>{question.title}</h1>
          ))}
        </div>
      </section>
    </>
  );
}
