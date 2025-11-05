const ROUTES = {
  HOME: "/",
  COMMUNITY: "/community",
  COLLECTION: "/collection",
  JOBS: "/jobs",
  TAGS: "tags",
  PROPFILE: (id: string) => `/profile/${id}`,
  ASKQUESTION: "ask-question",
};

export default ROUTES;
