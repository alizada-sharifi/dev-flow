"use client";
import Link from "next/link";
import Image from "next/image";

import { useState } from "react";

import { CircleUserRound, UserRoundPlus, Menu, X, LogOut } from "lucide-react";

import { cn } from "@/lib/utils";
import CustomButton from "../common/CustomButton";
import ROUTES from "@/constants/route";
import { Button } from "../ui/button";
import NavLinks from "./NavLinks";
import { signOutAction } from "@/lib/actions/auth.action";

function MobileNav({ userId }: { userId?: string }) {
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
          "custom-scrollbar fixed left-0 top-0 z-50 h-full w-[250px]! border-r bg-white p-6 shadow-md transition-transform duration-300 dark:bg-dark-200 dark:shadow-none",
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
            <p className="font-space-grotesk text-black font-semibold dark:text-white">
              Dev
              <b className="text-primary-500">OverFlow</b>
            </p>
          </Link>

          <button onClick={() => setOpen(false)}>
            <X size={16} />
          </button>
        </div>

        <NavLinks handleClick={handleLinkClick} />

        <div className="flex flex-col gap-3 mt-10">
          {userId ? (
            <form action={signOutAction}>
              <Button
                type="submit"
                className="base-medium w-fit bg-transparent px-4 py-3"
              >
                <LogOut className="size-5 text-black dark:text-white" />
                <span className="text-dark-300 dark:text-white">Logout</span>
              </Button>
            </form>
          ) : (
            <>
              <Link href={ROUTES.LOGIN} className="w-full block">
                <CustomButton variant="secondary" className="w-full">
                  <CircleUserRound className="lg:hidden" />
                  <p className="primary-text-gradient">Log In</p>
                </CustomButton>
              </Link>

              <Link href={ROUTES.SIGNUP} className="w-full block">
                <CustomButton variant="tertiary" className="w-full">
                  <UserRoundPlus />
                  <p>Sign Up</p>
                </CustomButton>
              </Link>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default MobileNav;
