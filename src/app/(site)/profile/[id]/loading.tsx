import { Skeleton } from "@/components/ui/skeleton";

function loading() {
  return (
    <>
      <div className="flex max-lg:flex-col items-start gap-4">
        <Skeleton className="rounded-full size-[140px]" />
        <div className="mt-3 space-y-3.5">
          <Skeleton className="w-30 h-8" />
          <Skeleton className="w-25 h-6" />
          <Skeleton className="w-50 h-8" />
        </div>
      </div>

      <div className="mt-10">
        <h3 className="h3-bold text-dark-200 dark:text-white">Stats</h3>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-44" />
          ))}
        </div>
      </div>

      <div className="flex mt-10 gap-10 justify-between">
        <div className="flex-1">
          <Skeleton className="w-49 h-10" />

          <div className="flex flex-col mt-5 gap-6">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        </div>

        <div className="flex min-w-[90px] flex-col max-lg:hidden">
          <h3 className="h3-bold text-dark-200 dark:text-white">Top Tags</h3>

          <div className="flex flex-col gap-4 mt-7">
            <div className="flex w-full flex-col gap-6">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default loading;
