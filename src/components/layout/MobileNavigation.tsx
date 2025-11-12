import MobileNav from "./MobileNav";
import { auth } from "@/auth";

async function MobileNavigation() {
  const session = await auth();
  const userId = session?.user?.id;
  return <MobileNav userId={userId} />;
}

export default MobileNavigation;
