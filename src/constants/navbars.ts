import {
  BriefcaseBusiness,
  FileQuestionMark,
  House,
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
    route: "/tag",
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
];

export default navbars;
