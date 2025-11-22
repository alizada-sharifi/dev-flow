"use server";

import { Answer, Question, User } from "@/database";
import { FilterQuery, PipelineStage, Types } from "mongoose";

import { PaginatedSearchParamsSchema } from "@/schemas/paginated-search-params.schema";
import action from "../handlers/action";
import handleError from "../handlers/error";

import {
  ActionResponse,
  AnswerType,
  Badges,
  ErrorResponse,
  paginatedSearchParams,
  QuestionType,
  UserType,
} from "@/types";
import {
  getUserAnswersData,
  GetUserAnswersSchema,
  getUserData,
  getUserQuestionsData,
  getUserSchema,
  getUserTagData,
  GetUserTagSchema,
} from "@/schemas/user.schema";
import { NotFoundError } from "../http-errors";
import { assignBadges } from "../utils";
import dbConnect from "../mongoose";

export async function getUsers(
  params: paginatedSearchParams
): Promise<ActionResponse<{ users: UserType[]; isNext: boolean }>> {
  const validationResult = await action({
    params,
    schema: PaginatedSearchParamsSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { page = 1, pageSize = 10, query, filter } = params;
  const skip = (Number(page) - 1) * pageSize;
  const limit = pageSize;

  const filterQuery: FilterQuery<typeof User> = {};

  if (query) {
    filterQuery.$or = [
      { name: { $regex: new RegExp(query, "i") } },
      { email: { $regex: new RegExp(query, "i") } },
    ];
  }

  let sortCriteria = {};

  switch (filter) {
    case "newest":
      sortCriteria = { createdAt: -1 };
      break;
    case "oldest":
      sortCriteria = { createdAt: 1 };
      break;
    case "popular":
      sortCriteria = { reputation: -1 };
      break;
    default:
      sortCriteria = { createdAt: -1 };
      break;
  }

  try {
    const totalUsers = await User.countDocuments(filterQuery);

    const users = await User.find(filterQuery)
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);

    const isNext = totalUsers > skip + users.length;

    return {
      success: true,
      data: {
        users: JSON.parse(JSON.stringify(users)),
        isNext,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getuser(params: getUserData): Promise<
  ActionResponse<{
    user: UserType;
  }>
> {
  const validationResult = await action({
    params,
    schema: getUserSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { userId } = params;

  try {
    const user = await User.findById(userId);
    if (!user) throw new NotFoundError("User");

    return {
      success: true,
      data: {
        user: JSON.parse(JSON.stringify(user)),
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getuserQuestions(params: getUserQuestionsData): Promise<
  ActionResponse<{
    questions: QuestionType[];
    isNext: boolean;
  }>
> {
  const validationResult = await action({
    params,
    schema: getUserSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { page = 1, pageSize = 10, userId } = params;
  const skip = (Number(page) - 1) * pageSize;
  const limit = pageSize;

  try {
    const totalQuestions = await Question.countDocuments({ author: userId });

    const questions = await Question.find({ author: userId })
      .populate("tags", "name")
      .populate("author", "name image")
      .skip(skip)
      .limit(limit);

    const isNext = totalQuestions > skip + questions.length;

    return {
      success: true,
      data: {
        questions: JSON.parse(JSON.stringify(questions)),
        isNext,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getuserAnswers(params: getUserAnswersData): Promise<
  ActionResponse<{
    answers: AnswerType[];
    isNext: boolean;
  }>
> {
  const validationResult = await action({
    params,
    schema: GetUserAnswersSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { page = 1, pageSize = 10, userId } = params;
  const skip = (Number(page) - 1) * pageSize;
  const limit = pageSize;

  try {
    const totalAnswers = await Answer.countDocuments({ author: userId });

    const answers = await Answer.find({ author: userId })
      .populate("author", "_id name image")
      .skip(skip)
      .limit(limit);

    const isNext = totalAnswers > skip + answers.length;

    return {
      success: true,
      data: {
        answers: JSON.parse(JSON.stringify(answers)),
        isNext,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getUserTopTags(params: getUserTagData): Promise<
  ActionResponse<{
    tags: { _id: string; name: string; count: number }[];
  }>
> {
  const validationResult = await action({
    params,
    schema: GetUserTagSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { userId } = params;

  try {
    const pipline: PipelineStage[] = [
      {
        $match: { author: new Types.ObjectId(userId) },
      },
      { $unwind: "$tags" },
      { $group: { _id: "$tags", count: { $sum: 1 } } },
      {
        $lookup: {
          from: "tags",
          localField: "_id",
          foreignField: "_id",
          as: "tagInfo",
        },
      },
      { $unwind: "$tagInfo" },
      { $sort: { count: -1 } },
      { $limit: 10 },
      {
        $project: {
          _id: "$tagInfo._id",
          name: "$tagInfo.name",
          count: 1,
        },
      },
    ];

    const tags = await Question.aggregate(pipline);

    return {
      success: true,
      data: { tags: JSON.parse(JSON.stringify(tags)) },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getUserStats(params: getUserData): Promise<
  ActionResponse<{
    totalQuestions: number;
    totalAnswers: number;
    badges: Badges;
  }>
> {
  const validationResult = await action({
    params,
    schema: getUserSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { userId } = params;

  try {
    await dbConnect();

    const [questionStats] = await Question.aggregate([
      { $match: { author: new Types.ObjectId(userId) } },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          upvotes: { $sum: "$upvotes" },
          views: { $sum: "$views" },
        },
      },
    ]);

    const [answerStats] = await Answer.aggregate([
      { $match: { author: new Types.ObjectId(userId) } },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          upvotes: { $sum: "$upvotes" },
        },
      },
    ]);

    // Handle cases where there are no questions or answers
    const questionCount = questionStats?.count || 0;
    const answerCount = answerStats?.count || 0;
    const questionUpvotes = questionStats?.upvotes || 0;
    const answerUpvotes = answerStats?.upvotes || 0;
    const questionViews = questionStats?.views || 0;

    const badges = assignBadges({
      criteria: [
        { type: "ANSWER_COUNT", count: answerCount },
        { type: "QUESTION_COUNT", count: questionCount },
        {
          type: "QUESTION_UPVOTES",
          count: questionUpvotes + answerUpvotes,
        },
        { type: "TOTAL_VIEWS", count: questionViews },
      ],
    });

    return {
      success: true,
      data: {
        totalQuestions: questionCount,
        totalAnswers: answerCount,
        badges,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
