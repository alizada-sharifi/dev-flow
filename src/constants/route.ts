const ROUTES = {
  HOME: "/",
  COMMUNITY: "/community",
  COLLECTION: "/collection",
  JOBS: "/jobs",
  TAGS: "tags",
  PROPFILE: (id: string) => `/profile/${id}`,
  ASKQUESTION: "ask-question",
  LOGIN: "/login",
  SIGNUP: "/sign-up",
};

export default ROUTES;
