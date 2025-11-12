import Image from "next/image";
import Link from "next/link";

import ROUTES from "@/constants/route";
import ThemeToggle from "./ThemeToggle";
import UserAvatar from "./UserAvatar";
import { auth } from "@/auth";
import MobileNavigation from "./MobileNavigation";

async function Navbar() {
  const session = await auth();
  return (
    <nav className="sticky top-0 w-full flex items-center justify-between py-4 px-6 dark:bg-dark-300 bg-light-850 z-50 shadow-sm dark:shadow-none">
      <Link href={ROUTES.HOME} className="flex items-center gap-1">
        <Image src="/images/site-logo.svg" width={23} height={23} alt="Logo" />
        <p className="h2-bold  font-space-grotesk text-black dark:text-white max-sm:hidden">
          Dev
          <b className="text-primary-500">OverFlow</b>
        </p>
      </Link>
      globals search
      <div className="flex gap-x-5">
        <ThemeToggle />
        {session?.user?.id && (
          <UserAvatar
            id={session.user?.id}
            name={session.user.name!}
            image={session.user?.image}
          />
        )}
        <MobileNavigation />
      </div>
    </nav>
  );
}

export default Navbar;
