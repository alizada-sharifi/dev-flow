import Image from "next/image";

import { SocialAuthForm } from "@/components";

function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-10 bg-auth-light dark:bg-auth-dark">
      <section className="max-w-2xl px-4 border-light-800 dark:border-dark-400 shadow-sm rounded-sm sm:min-w-[520px] sm:px-8 bg-light-800 dark:bg-dark-200 py-10">
        <div className="flex items-center justify-between">
          <div className="space-y-2.5">
            <h1 className="h2-bold">Join DevOverFlow</h1>
            <p className="paragraph-regular text-dark-500 dark:text-light-400">
              To get your question answered
            </p>
          </div>

          <Image
            src={"/images/site-logo.svg"}
            alt="DevOverflow logo"
            width={50}
            height={50}
          />
        </div>

        {children}

        <SocialAuthForm />
      </section>
    </main>
  );
}

export default AuthLayout;
