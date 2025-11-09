export type TagType = {
  _id: string;
  name: string;
};

export type AuthorType = {
  _id: string;
  name: string;
  image: string;
};

export type QuestionType = {
  _id: string;
  title: string;
  content: string;
  tags: TagType[];
  author: AuthorType;
  createdAt: Date;
  upvotes: number;
  downvotes: number;
  answers: number;
  views: number;
};
