import { LeftSidebar, Navbar, RightSidebar } from "@/components";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-screen flex-col bg-light-850 dark:bg-black">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar />

        <section className="flex flex-1 flex-col overflow-y-auto px-6 pt-6 pb-6 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        <RightSidebar />
      </div>
    </main>
  );
}
