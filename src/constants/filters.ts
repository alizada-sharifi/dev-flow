export type FilterType = {
  name: string;
  value: string;
};

export const homePageFilters: FilterType[] = [
  {
    name: "Newest",
    value: "newest",
  },
  {
    name: "Unanswerd",
    value: "unanswered",
  },
  {
    name: "Popular",
    value: "popular",
  },

  {
    name: "Recommended",
    value: "recommended",
  },
];

export const collectionPageFilter: FilterType[] = [
  {
    name: "Most Recent",
    value: "mostrecent",
  },
  {
    name: "Oldest",
    value: "oldest",
  },
  {
    name: "Most Voted",
    value: "mostvoted",
  },
  {
    name: "Most Viewed",
    value: "mostviewed",
  },
  {
    name: "Most Answered",
    value: "mostanswered",
  },
];

export const communityPageFilter: FilterType[] = [
  {
    name: "Newest",
    value: "newest",
  },
  {
    name: "Oldest",
    value: "oldest",
  },
  {
    name: "Popular",
    value: "popular",
  },
];

export const answerFilters: FilterType[] = [
  {
    name: "Latest",
    value: "latest",
  },
  {
    name: "Oldest",
    value: "oldest",
  },
  {
    name: "Popular",
    value: "popular",
  },
];

export const tagsPageFilters: FilterType[] = [
  {
    name: "A-Z",
    value: "name",
  },
  {
    name: "Popular",
    value: "popular",
  },
  {
    name: "Recent",
    value: "recent",
  },
  {
    name: "Oldest",
    value: "oldest",
  },
];

export const GlobalSearchFilters = [
  { name: "Question", value: "question" },
  { name: "Answer", value: "answer" },
  { name: "User", value: "user" },
  { name: "Tag", value: "tag" },
];
