"use client";
import { usePathname } from "next/navigation";
import navbars from "@/constants/navbars";
import Link from "next/link";
import { cn } from "@/lib/utils";
import CustomButton from "../common/CustomButton";
import { CircleUserRound, UserRoundPlus, Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import ROUTES from "@/constants/route";
import { Button } from "../ui/button";

function LeftSidebar() {
  const pathname = usePathname();
  const userId = 1;
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => setOpen(false);

  return (
    <>
      <Button
        className="md:hidden"
        aria-label="Toggle Mobile menu"
        size="icon"
        variant="ghost"
        onClick={() => setOpen(!open)}
      >
        <Menu />
      </Button>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <section
        className={cn(
          "custom-scrollbar fixed left-0 top-0 z-50 h-full w-[250px] border-r bg-white p-6 shadow-md transition-transform duration-300 dark:bg-dark-200 dark:shadow-none",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between mb-10">
          <Link href={ROUTES.HOME} className="flex items-center gap-1">
            <Image
              src="/images/site-logo.svg"
              width={23}
              height={23}
              alt="Logo"
            />
            <p className="font-space-grotesk text-black dark:text-white">
              Dev
              <b className="text-primary-500">OverFlow</b>
            </p>
          </Link>

          <button onClick={() => setOpen(false)}>
            <X size={16} />
          </button>
        </div>

        <ul className="flex flex-col gap-y-4 mt-10 lg:mt-0">
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
                  "p-2 rounded-md",
                  isActive
                    ? "primary-gradient text-white"
                    : "text-dark-300 dark:text-white"
                )}
              >
                <Link
                  href={path}
                  onClick={handleLinkClick}
                  className="flex gap-2 items-center"
                >
                  <item.icon size={22} />
                  <p className={cn(isActive ? "base-bold" : "base-medium")}>
                    {item.label}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex flex-col gap-3 mt-10">
          <CustomButton variant="secondary">
            <CircleUserRound className="lg:hidden" />
            <p className="primary-text-gradient">Log In</p>
          </CustomButton>

          <CustomButton variant="tertiary">
            <UserRoundPlus />
            <p>Sign Up</p>
          </CustomButton>
        </div>
      </section>
    </>
  );
}

export default LeftSidebar;
