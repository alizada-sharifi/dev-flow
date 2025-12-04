import {
  BriefcaseBusiness,
  FileQuestionMark,
  House,
  NotebookPen,
  Star,
  Tag,
  UserRound,
  Users,
} from "lucide-react";
import ROUTES from "./route";

const navbars = [
  {
    icon: House,
    route: ROUTES.HOME,
    label: "Home",
  },
  {
    icon: Users,
    route: ROUTES.COMMUNITY,
    label: "Community",
  },
  {
    icon: Star,
    route: ROUTES.COLLECTION,
    label: "Collections",
  },
  {
    icon: BriefcaseBusiness,
    route: ROUTES.JOBS,
    label: "Find Jobs",
  },
  {
    icon: Tag,
    route: ROUTES.TAGS,
    label: "Tags",
  },

  {
    icon: UserRound,
    route: "/profile",
    label: "Profile",
  },
  {
    icon: FileQuestionMark,
    route: ROUTES.ASKQUESTION,
    label: "Ask Question",
  },
  {
    icon: NotebookPen,
    route: ROUTES.BLOG,
    label: "Blog",
  },
];

export default navbars;
