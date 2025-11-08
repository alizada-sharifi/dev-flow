const ROUTES = {
  HOME: "/",
  COMMUNITY: "/community",
  COLLECTION: "/collection",
  JOBS: "/jobs",
  TAGS: (id: string) => `/tags/${id}`,
  PROPFILE: (id: string) => `/profile/${id}`,
  ASKQUESTION: "ask-question",
  LOGIN: "/login",
  SIGNUP: "/sign-up",
};

export default ROUTES;
