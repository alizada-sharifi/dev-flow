import Link from "next/link";

import { CircleUserRound, LogOut, UserRoundPlus } from "lucide-react";

import CustomButton from "../common/CustomButton";
import ROUTES from "@/constants/route";
import { auth } from "@/auth";
import NavLinks from "./NavLinks";
import { Button } from "../ui/button";
import { signOutAction } from "@/lib/actions/auth.action";

async function LeftSidebar() {
  const session = await auth();
  const userId = session?.user?.id;

  return (
    <>
      <section className="custom-scrollbar sticky left-0 top-0 overflow-y-auto border-r p-6 shadow-sm dark:shadow-none lg:w-[266px] h-full max-md:hidden">
        <NavLinks userId={userId} />

        <div className="flex flex-col gap-3 mt-10">
          {userId ? (
            <form action={signOutAction}>
              <Button
                type="submit"
                className="base-medium w-fit bg-transparent px-4 py-3"
              >
                <LogOut className="size-5 text-black dark:text-white" />
                <span className="text-dark-300 dark:text-white max-lg:hidden">
                  Logout
                </span>
              </Button>
            </form>
          ) : (
            <>
              <Link href={ROUTES.LOGIN} className="block w-full">
                <CustomButton variant="secondary" className="w-full">
                  <CircleUserRound size={26} className="lg:hidden" />
                  <p className="primary-text-gradient md:hidden lg:block">
                    Log In
                  </p>
                </CustomButton>
              </Link>

              <Link href={ROUTES.SIGNUP} className="block w-full">
                <CustomButton variant="tertiary" className="w-full">
                  <UserRoundPlus size={40} className="lg:hidden" />
                  <p className="md:hidden lg:block">Sign Up</p>
                </CustomButton>
              </Link>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default LeftSidebar;
