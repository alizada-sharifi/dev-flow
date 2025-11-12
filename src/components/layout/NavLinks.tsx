"use client";

import navbars from "@/constants/navbars";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavLinks({
  userId,
  handleClick,
}: {
  userId?: string;
  handleClick?: () => void;
}) {
  const pathname = usePathname();
  return (
    <>
      <ul className="flex flex-col gap-y-4">
        {navbars.map((item) => {
          const isActive =
            (pathname.includes(item.route) && item.route.length > 1) ||
            pathname === item.route;

          if (item.route === "/profile") {
            if (userId) item.route = `${item.route}/${userId}`;
            else return null;
          }
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
                onClick={handleClick}
                href={item.route}
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
    </>
  );
}

export default NavLinks;
