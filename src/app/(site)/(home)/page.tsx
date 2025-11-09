import Link from "next/link";

import { CustomButton, LocalSearch } from "@/components";
import ROUTES from "@/constants/route";
import HomeFilter from "./_components/HomeFilter";
import QuestionCard from "./_components/QuestionCard";
import { QuestionType } from "@/types";

const questions: QuestionType[] = [
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
    author: {
      _id: "1",
      name: "John Doe",
      image:
        "data:image/jpeg;base64,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",
    },
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
    author: {
      _id: "1",
      name: "John Doe",
      image:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIPDxUQEBAPDxAQFRUWEhAVDQ8REBIVFRUXFhYVFxUYHSggGBolGxYVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQFysfHx8tLS0tLSstLSstKy0tKy0tKy0tLSstLS0tLS0tKy0tLS0tLS0tLS0tKy0tLSsrLTcrOP/AABEIALcBEwMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAAAQIDBAYHBQj/xAA/EAACAQIDBQUFBAgGAwAAAAAAAQIDEQQSIQUGMUFRE2FxgZEHIjKhwVKx0eEUI0JykqKy8BUzYoLC8TRT0v/EABkBAQADAQEAAAAAAAAAAAAAAAABAgMEBf/EACIRAQEAAgICAgIDAAAAAAAAAAABAhEDMRIhMkFRYSJCcf/aAAwDAQACEQMRAD8A7cgAAAIAkgAAAAAAAAEASCABJAMDbO16ODp9rXmox4Jc5PokBng4/tv2pVXNqhKFOHJwiqkvOUll+SNdo+0PaUZZ1iZTjfWMqdJxf8vD0K+cX8K+ggcz3b9qSnONPG0o08zSVanfIm9Fmi7tK+l78eR0fDYiFWOanKM4vhJNNEyyq3GztdABKAAAAAAAAAEACSAAAAApsCSQKyCSAAAAAAAAAAIAEkAAAAAOZe1eu6lWnQpOcqqi1kg7O8nfWyvwtzR0urPLFy45U3brZXOd7rrtalfEzV6k5OzbvlXFpX4LX5FM614pu7aJhPZ9ist/1UXJe8pSk5O/J2MinuDi+GemrK3JqXidQi7lyUTn8q6/HH8ObS3BrKjdVYdrBPLGzaafFN9/U9L2QbYnSxFXA4hOMpvNFPS04r3l33Svp07zcps1DeqX6LiaGMgknCSzWWrs/qrplsctVTk49x1kgt4esqkIzj8M4qS8JK6+8uHS4gAAAAAAAAEACQQAJIAAkAAVAAAAABBJAAAAAAAAAAAAW68bwkusWvVGh7l/+GptpXvfy4m8bQbVKeV2lldn0b0uabsvD5aFWEbKKrTUbLRK0eRlnfbfixtm/wBsXEb0UaU8soV8rdu0VJuHqe1DHU5U+0Um42vw19DVMXsCU6nxzlHW6y0/e82m1r0foethdmOnhZ0s0mpJ2fNaK9unMw3XZ4xgy3sUqrpwoSaT+NzhFeNmW96stbA1J2adO0rc001p8ymW7qTjkz5Fd5VOSjJvg5W5q/43sZm08BlwdSmm3eK73o0xKZT8Ny3XlfAYZrnQpP8AkR6h5m7kIww0YR4QukuivdL0aPTOvG7jzs5rKwABKoAAIAAAAAAAAAAAAAVggASQAAAAAAAAAAAAAEAC1i4OVOSXFp28TWaUknKN1Za+ptZr+9KyqM+TvF/evqZ8k+23Fn/VgSxcY8ba99jxKm9uHpudOaqZorRuNozfSD59C3tHDdvFOFTJNXyqUXKF/wDVFNNrzRj0cFHKu2/RlUi//RB2lbinKWnI5Za9CYyx7Gy9rRqwVrxb1ytrOvGxONrN2irtylFaK7tfX5HkYfCZJOrVqQkrrs1GmoZVw1aep7e6s+2xSa1VNSk+a+ytf91/UnHdulOSzGbbXsei4UVfi3f6L5IziAdkmpp52WXldpBAJVAAAAAAAgCSAAAAAEkACsAAAAAAAAAAAQAAAAAAAeZvJh+0wtSPOyafRpqzMnH7QpYeOerOMFyu9X3JcWzVMHvfHGzq0opQikskX8clzbfDpovVlcrJGnHjbdtFp7XdGs6dW8WuKfdwafNanoVMVhKnvVXGbtpeXC5lbx7BhiFdr3lwfBnPMTuxWztJtrleL++xx+v8d88p17bNtzb9KyhTlez5NeXkb37L8K4UalSatKo4adIpSsvm35nO9291FTkp1FdrrqdH2fi6tGlPsFSctHaopZXbleLvHx1t0L8dkyZ8uOWWLcweRu9vBSxtNSg1GovjpOXvJ932l3nrnVLtw2WdgAJQAAAQAAAAAEACQQAJBAAuAgASCAAAAAAAACAJBBoW/W9EqTlRpNZYvLKzd3Kyum+mtvJkW6WxxuV02Xa28mHw2kpqU/sRab83yNL3h37qun+plGlmdlbWVuer+hoWJ2i5yak9G9JdH3mFVrNpJvhL70ZXK10Y8eMehidpVKs81WcptvVuTZYo42VKopwbjKLvGS/vUxJSuJy4FGjesDvlSmkq6dOXOSi5U336ar0MyptnBt/59P8AmX0ObVO7TwZQ2n1uVuEWmdjp625hEtK9N/xfgeRtvehSg6VC9paTqWs2uaiuPmaZBacWXqTVmxMZC5Ws+liHFPK3FrhZ21Ni2PvpiacLdq5OH7M/ejJdNdV5Gn59PEsyq2v3l4rZL27Lsrf6jUsq8XSl9qLzR9OK+ZteExlOtHNSnGceqfDxXI+do1na6bv9P7uezsfblWhJTpyakn15d65+BeZ37Y5cUvTu4PN3f2qsXQVVWTvlklwuua7ndM9I1YWaACAgAAAAAAAAAAFYIAEkAAAAAAAAAgCzjsR2VKdT7EW/PkvWxwba+Jbk3JuWdt377nYt9K+TBy/1Sivvl/xOIY2pZ9Vczz7dHFPW2FVs+9PiungWHLTjdppePf6Cq8uq1XNdxZUvvXoUX2y4slyLaZNyFktlDJkUzAvp3iReysWKci4wbXc2hbqsmTLcmBUpl6NVx0XxT4P6+X98TCpS7/HwX/bL+GleWbrpFdF+f4Eo26t7LdoWlPD30cVKK74/k/kdGOLbhYvJjaTva88vjnWX6naTXDphyz+QAQXZJBAAAAAAAAAArAIIEggAAAAAAAEADVPaNUthoLrN/KEvxONY96+Z1z2nTtRorrOf3JfU4/jL3Zll26eP4sNzt3rmjFkssrcnZr1Mu3VGNiqdlpy1j9URE1fTJb0MdTLmYhO1y4ky25ESYSqTsV5iw5kqoEbZOYx60rejKlUuWKyc5KCTcpPKkuLb0SQKUk5Witb2vpq7/DFeJ6dTDToyyVISpz+zKNpa6rQ3Xdjdj9EpxqyjGri5aqF1lp37+XRvusu/NjsGDrSqYlfpOIkvhb/U01yVuiXXxK3L21x4rr9tQ2NXdOrCf2ZRfo0z6DTvquD1R89Qg41ZQaUZQlJZVLMo2drJ80up3DdfF9tg6M73agovxh7v0v5mvHXNzR6oIBqwSCABJAAAAAAABWCAQAAAAEASCASJBAA0L2p1bKiv33/SvocpxCudQ9qi96i+WWXyf5o5liPxMMu3Vx/GMIiaurEzWurRMSFnmUpaLuLiqd56uzt0cVWjmXZU4y1jmlLM4vg2ktNLcz247hdjQnXxNZycI3UKdoxveyTlLVq7XBIbiJjWnSnZl1S0M6pgab+0vCf43KHs9L4XKXohs1WCUsyJ4ZdZR8Un+BM8B7qkprvTi1boSjVYc6uXgzY9wMAsRXliJq9PD8HydRrh5J/NHgT2bUnZRyO7Svn0Xe762OgbGx+H2fh4Uo5qqjrJpWzSb1k7lc769Lcc97v02ulJwfxWctXp8KtwXfYwt66zhhJzo1VS4JSy5pVG2l7rvo+/Uw57y4d2+JxnrP3UvCPE1beja7xdVW7WFCPwKChb956tr0RnjHRlnNbYGE0/7vc617MMZmo1aT/YlGS/3Jp/0o5Hh7LhOT/eeZHTfZSverPllj/UzfHtycnxdFBANnMkgEASCABIIAEggBCsEACQQAABAEggASCABpXtQpXo0p/ZlNeqT/4nKMdXsvhUul/yOy+0WlmwLl9icX5O8fqjieJn8jHOe3Tx3+LzpTm38EV3Ky9bouwnB6XtLuTlH1KHIdq+v5ELusbFqwlD3ZRkkkm007dOBi797RhHBunGSblOC06J5n9xzehi3T1jKUe9Sab9DF2tj51oJSqz0d0tPD6lJjqrZZyxlKtcdpr8coPk1e3meJQxcoPLUulyk1ZM9KnPMtGmXsZzLbLWIqRfvZZLrlTRd7ZPVJLquRj05tL+9SqyIXVS46c+HeQ6zasymMreHQiST4MCjtGrpeX1IjXfh1XeJIoSJVX6E3GWZc+Ka0aOueyZe7Xly/Vr+tnH6TOz+yWk1g5zf7dW3lGK/wDplse1eT4t5BANXMkEAACABIIAEkkACoFNxcCq5BFxcCQRcXAkEACQQAPM3nw3bYKvBK7dOTS74+8vmj56xfFn0ufPm+ezHhMZVo/sqWaHfCWsX6aeTM859tuK/TX5FDi+RcuUyT5WXkVaLbo9de65McO73bV/uKW5dxClLr6II9LlSgne7vfuuYTwSjrBzXdmt6GRKb+zfzLcp1HwhFeMmwXSvD14t27WSf2ZNJ/mZ0V3ni4nDylrKUE10jb79SxSq9k/8yXgtV6E62jy02BhHkU9qJ/sy9V9xkx2hHnn/hj+JGqnzj0lEocTAe1afSp/BD6yOi7qbg/4hhKeLjjFCFXN7n6O5Si4ycXFvPbihqnnGkwhdn0Pulsx4TBUqMvjUc0/35e9JeV7eRrm7/s3o4atGtVrPEum7wh2Sp01JcG1duVul7G8XL4zTLPOX1FVxcpuLl2aogi4uBIuRci4FVwU3JuBUCm4AKRNwAguLgALi4AC4uAAuLgALmtb4bn0tpKMpTlRrU1aNVRUrx45ZRbV1e7WqtdgEVMunI/aHu/HY/YxVV4iddVG/wBWqUYqDglzldvM/Q1GnjbxzOPln/IkFdRrLWNLaH+l/wAf5ETx7UVJRvdtP3rWfoANRHlVn/FH9hfxP8Cf02pLSNkANQ3ULDzlxl6fiQ8EgCNrainsMpXyAJVWZLU7f7BdpZsNiMM7/qakakeijVjZr1pt/wC4AmIvTqVxcAszLi4AC4uASFxcAgLkNgAU5gASP//Z",
    },
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
            <QuestionCard key={question._id} question={question} />
          ))}
        </div>
      </section>
    </>
  );
}
