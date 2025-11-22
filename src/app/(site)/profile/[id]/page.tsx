import { auth } from "@/auth";
import {
  CustomButton,
  DataRender,
  Pagination,
  QuestionCard,
  TagCard,
  UserAvatar,
} from "@/components";
import {
  getuser,
  getuserAnswers,
  getuserQuestions,
  getUserTopTags,
} from "@/lib/actions/user.action";
import { RouteParams } from "@/types";
import { notFound } from "next/navigation";
import ProfileLink from "./_components/ProfileLink";
import { CalendarDays, Link as LinkIcon, MapPin } from "lucide-react";
import dayjs from "dayjs";
import Link from "next/link";
import ROUTES from "@/constants/route";
import Stats from "./_components/Stats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EMPTY_ANSWERS, EMPTY_QUESTION, EMPTY_TAGS } from "@/constants/states";
import AnswerCard from "@/components/common/AnswerCard";

async function ProfileDetails({ params, searchParams }: RouteParams) {
  const { id } = await params;
  const { page, pageSize } = await searchParams;
  if (!id) notFound();

  const currentUser = await auth();
  const { success, data, error } = await getuser({
    userId: id,
  });

  if (!success) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="h1-bold">User Not Found</h1>
        <p className="paragraph-regular text-dark-200 dark:text-light-800 max-w-md">
          {error?.message || "There is no user with this id"}
        </p>
      </div>
    );
  }

  const { user } = data!;

  const {
    success: questionsSuccess,
    data: questionsData,
    error: questionsError,
  } = await getuserQuestions({
    userId: id,
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
  });

  const {
    success: answersSuccess,
    data: answersData,
    error: answersError,
  } = await getuserAnswers({
    userId: id,
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
  });

  const {
    success: tagsSuccess,
    data: tagsData,
    error: tagsError,
  } = await getUserTopTags({
    userId: id,
  });

  const { isNext: hasMoreQuestions, questions } = questionsData!;
  const { isNext: hasMoreAnswers, answers } = answersData!;
  const { tags } = tagsData!;

  return (
    <>
      <section className="flex max-sm:flex-col-reverse items-start justify-between">
        <div className="flex max-lg:flex-col items-start gap-4">
          <UserAvatar
            id={user._id}
            name={user.name}
            image={user.image}
            className="size-[140px]"
            fallbackClassName="text-6xl font-bold"
          />

          <div className="mt-3">
            <h2 className="h2-bold">{user.name}</h2>
            <p className="paragraph-regular text-dark-200 dark:text-light-800">
              @{user.username}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              {user.portfolio && (
                <ProfileLink
                  title="Portfolio"
                  href={user.portfolio}
                  Icon={LinkIcon}
                />
              )}

              {user.location && (
                <ProfileLink title={user.location} Icon={MapPin} />
              )}

              <ProfileLink
                Icon={CalendarDays}
                title={dayjs(user.createdAt).format("MMMM YYYY")}
              />
            </div>

            {user.bio && (
              <p className="paragraph-regular text-dark-400 dark:text-light-800 mt-8">
                {user.bio}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          {currentUser?.user?.id === id && (
            <Link href={ROUTES.EDITPROFILE}>
              <CustomButton variant="secondary">Edit Profile</CustomButton>
            </Link>
          )}
        </div>
      </section>

      <Stats
        badges={{ gold: 0, bronze: 0, silver: 0 }}
        reputationPoints={0}
        totalAnswers={0}
        totalQuestions={0}
      />

      <section className="mt-10 flex gap-10 min-w-[300px] w-full">
        <Tabs className="flex-1 w-full" defaultValue="top-posts">
          <TabsList className="bg-light-800 dark:bg-dark-400 min-h-10.5 p-1">
            <TabsTrigger value="top-posts" className="tab cursor-pointer">
              Top Posts
            </TabsTrigger>

            <TabsTrigger value="answers" className="tab cursor-pointer">
              Top Answers
            </TabsTrigger>
          </TabsList>

          <TabsContent
            className="mt-5 flex w-full flex-col gap-6"
            value="top-posts"
          >
            <DataRender
              data={questions}
              empty={EMPTY_QUESTION}
              success={questionsSuccess}
              error={questionsError}
              render={(questions) => (
                <div className="flex w-full flex-col gap-6">
                  {questions.map((question) => (
                    <QuestionCard
                      question={question}
                      key={question._id}
                      showActionsButtons={
                        currentUser?.user?.id === question.author._id
                      }
                    />
                  ))}
                </div>
              )}
            />

            <Pagination page={page} isNext={hasMoreQuestions || false} />
          </TabsContent>

          <TabsContent
            className="mt-5 flex w-full flex-col gap-6"
            value="answers"
          >
            <DataRender
              data={answers}
              empty={EMPTY_ANSWERS}
              success={answersSuccess}
              error={answersError}
              render={(answers) => (
                <div className="flex w-full flex-col gap-6">
                  {answers.map((answer) => (
                    <AnswerCard
                      key={answer._id}
                      {...answer}
                      content={answer.content.slice(0, 30)}
                      containerClassName="bg-white dark:dark-gradient shadow-ligh-100 dark:shadow-dark-100 rounded-[10px] px-7 py-9 sm:px-11"
                      showReadMore
                      showActionsButtons={
                        currentUser?.user?.id === answer.author._id
                      }
                    />
                  ))}
                </div>
              )}
            />

            <Pagination page={page} isNext={hasMoreAnswers || false} />
          </TabsContent>
        </Tabs>

        <div className="flex min-w-[90px] flex-col max-lg:hidden">
          <h3 className="h3-bold text-dark-200 dark:text-white">Top Tags</h3>

          <div className="flex flex-col gap-4 mt-7">
            <DataRender
              data={tags}
              empty={EMPTY_TAGS}
              success={tagsSuccess}
              error={tagsError}
              render={(tags) => (
                <div className="flex w-full flex-col gap-6">
                  {tags.map((tag) => (
                    <TagCard
                      key={tag._id}
                      _id={tag._id}
                      name={tag.name}
                      compact
                      questions={tag.count}
                      showCount
                    />
                  ))}
                </div>
              )}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default ProfileDetails;
