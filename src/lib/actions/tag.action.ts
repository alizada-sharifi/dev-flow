import { FilterQuery } from "mongoose";
import { Question, Tag } from "@/database";

import { PaginatedSearchParamsSchema } from "@/schemas/paginated-search-params.schema";

import {
  ActionResponse,
  ErrorResponse,
  paginatedSearchParams,
  QuestionType,
  TagType,
} from "@/types";
import action from "../handlers/action";
import handleError from "../handlers/error";
import { GetTagQuestionsParams } from "@/types/action";
import { GetTagQuestionsSchema } from "@/schemas/get-tag-questions.schema";
import { NotFoundError } from "../http-errors";

export async function getTags(
  params: paginatedSearchParams
): Promise<ActionResponse<{ tags: TagType[]; isNext: boolean }>> {
  const validationResult = await action({
    params,
    schema: PaginatedSearchParamsSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { page = 1, pageSize = 10, query, filter } = params;

  const skip = (Number(page) - 1) * pageSize;
  const limit = Number(pageSize);
  const filterQuery: FilterQuery<typeof Tag> = {};
  if (query) {
    filterQuery.$or = [{ name: { $regex: query, $options: "i" } }];
  }

  let sortCriteria = {};

  switch (filter) {
    case "popular":
      sortCriteria = { questions: -1 };
      break;
    case "recent":
      sortCriteria = { createdAt: -1 };
      break;
    case "oldest":
      sortCriteria = { createdAt: 1 };
      break;
    case "name":
      sortCriteria = { name: 1 };
      break;
    default:
      sortCriteria = { questions: -1 };
      break;
  }

  try {
    const totalTags = await Tag.countDocuments(filterQuery);

    const tags = await Tag.find(filterQuery)
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);

    const isNext = totalTags > skip + tags.length;

    return {
      success: true,
      data: { tags: JSON.parse(JSON.stringify(tags)), isNext },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getTagQuestions(
  params: GetTagQuestionsParams
): Promise<
  ActionResponse<{ tag: TagType; questions: QuestionType[]; isNext: boolean }>
> {
  const validationResult = await action({
    params,
    schema: GetTagQuestionsSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { page = 1, pageSize = 10, query, tagId } = params;

  const skip = (Number(page) - 1) * pageSize;
  const limit = Number(pageSize);

  try {
    const tag = await Tag.findById(tagId);

    if (!tag) throw new NotFoundError("Tag");

    const filterQuery: FilterQuery<typeof Question> = {
      tags: { $in: [tagId] },
    };
    if (query) {
      filterQuery.title = { $regex: query, $options: "i" };
    }

    const totalQuestions = await Question.countDocuments(filterQuery);

    const questions = await Question.find(filterQuery)
      .select("_id title views upvotes downvotes author createdAt answers")
      .populate([
        {
          path: "author",
          select: "name image",
        },
        {
          path: "tags",
          select: "name",
        },
      ])
      .skip(skip)
      .limit(limit);

    const isNext = totalQuestions > skip + questions.length;

    return {
      success: true,
      data: {
        tag: JSON.parse(JSON.stringify(tag)),
        questions: JSON.parse(JSON.stringify(questions)),
        isNext,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
