const ROUTES = {
  HOME: "/",
  COMMUNITY: "/community",
  COLLECTION: "/collection",
  JOBS: "/jobs",
  TAGS: "/tags",
  PROFILE: (id: string) => `/profile/${id}`,
  QUESTIONS: (id: string) => `/questions/${id}`,
  TAG: (id: string) => `/tags/${id}`,
  ASKQUESTION: "/ask-question",
  LOGIN: "/login",
  SIGNUP: "/sign-up",
  SIGN_IN_WITH_OAUTH: `signin-with-oauth`,
  EDITPROFILE: "/profile/edit",
};

export default ROUTES;
