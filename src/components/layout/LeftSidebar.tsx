"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { CircleUserRound, UserRoundPlus } from "lucide-react";

import navbars from "@/constants/navbars";
import { cn } from "@/lib/utils";
import CustomButton from "../common/CustomButton";
import ROUTES from "@/constants/route";

function LeftSidebar() {
  const pathname = usePathname();
  const userId = 1;
  return (
    <>
      <section className="custom-scrollbar sticky left-0 top-0 overflow-y-auto border-r p-6 shadow-sm dark:shadow-none lg:w-[266px] h-full max-md:hidden">
        <ul className="flex flex-col gap-y-4">
          {navbars.map((item) => {
            const path =
              item.route === "/profile" && userId
                ? `${item.route}/${userId}`
                : item.route;

            const isActive =
              pathname === path || pathname.startsWith(`${path}/`);

            return (
              <li
                key={item.label}
                className={cn(
                  "p-2",
                  isActive
                    ? "primary-gradient rounded-md text-white"
                    : "text-dark-300 dark:text-white"
                )}
              >
                <Link
                  href={path}
                  className={cn(
                    "flex gap-1 items-center md:justify-center lg:justify-start"
                  )}
                >
                  <item.icon size={22} />
                  <p
                    className={cn(
                      "md:hidden lg:block",
                      isActive ? "base-bold" : "base-medium"
                    )}
                  >
                    {item.label}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex flex-col gap-3 mt-10">
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
        </div>
      </section>
    </>
  );
}

export default LeftSidebar;
