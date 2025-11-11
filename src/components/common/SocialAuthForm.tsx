"use client";

import Image from "next/image";

import { signIn } from "next-auth/react";
import { toast } from "sonner";

import { Button } from "../ui/button";
import ROUTES from "@/constants/route";

const handleSignIn = async (provider: "github" | "google") => {
  try {
    await signIn(provider, {
      // callbackUrl: ROUTES.HOME,
      // redirect: false,s
      redirectTo: ROUTES.HOME,
    });
  } catch (error) {
    console.log(error);

    toast.error(
      error instanceof Error ? error.message : "An error occured during sign-in"
    );
  }
};

function SocialAuthForm() {
  return (
    <div className="flex items-center justify-between flex-wrap gap-2.5  mt-10">
      <Button
        onClick={() => handleSignIn("github")}
        className=" bg-light-900 dark:bg-dark-400 body-medium text-dark-200 dark:text-light-800 min-h-12 flex-1 rounded-2 px-4 py-3.5 cursor-pointer hover:bg-light-900"
      >
        <Image
          src="/icons/github.svg"
          alt="Github logo"
          width={20}
          height={20}
          className="invert-colors mr-2.5 object-contain"
        />
        <span>Log in with GitHub</span>
      </Button>

      <Button
        onClick={() => handleSignIn("google")}
        className=" bg-light-900 dark:bg-dark-400 body-medium text-dark-200 dark:text-light-800 min-h-12 flex-1 rounded-2 px-4 py-3.5 cursor-pointer hover:bg-light-900"
      >
        <Image
          src="/icons/google.svg"
          alt="Google logo"
          width={20}
          height={20}
          className="mr-2.5 object-contain"
        />
        <span>Log in with Google</span>
      </Button>
    </div>
  );
}

export default SocialAuthForm;
