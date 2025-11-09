const ROUTES = {
  HOME: "/",
  COMMUNITY: "/community",
  COLLECTION: "/collection",
  JOBS: "/jobs",
  TAGS: (id: string) => `/tags/${id}`,
  PROFILE: (id: string) => `/profile/${id}`,
  QUESTIONS: (id: string) => `/questions/${id}`,
  ASKQUESTION: "ask-question",
  LOGIN: "/login",
  SIGNUP: "/sign-up",
};

export default ROUTES;
