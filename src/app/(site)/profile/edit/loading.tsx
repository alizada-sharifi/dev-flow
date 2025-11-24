import { Skeleton } from "@/components/ui/skeleton";

function loading() {
  return (
    <>
      <h1 className="h1-bold">Edit Profile</h1>

      <div className="mt-9 flex w-full flex-col gap-9">
        <div className="flex flex-col gap-1">
          <p className="gap-0.5 text-sm font-medium text-neutral-800 dark:text-light-850 mb-0">
            Name <span className="text-red-600">*</span>
          </p>
          <Skeleton className="max-h-12 sm:max-h-[52px] w-full" />
        </div>

        <div className="flex flex-col gap-1">
          <p className="gap-0.5 text-sm font-medium text-neutral-800 dark:text-light-850 mb-0">
            Username
            <span className="text-red-600">*</span>
          </p>
          <Skeleton className="max-h-12 sm:max-h-[52px] w-full" />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-neutral-800 dark:text-light-850 mb-0">
            Portfolio link
          </p>
          <Skeleton className="max-h-12 sm:max-h-[52px] w-full" />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-neutral-800 dark:text-light-850 mb-0">
            Location
          </p>
          <Skeleton className="max-h-12 sm:max-h-[52px] w-full" />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-neutral-800 dark:text-light-850 mb-0">
            Bio
          </p>
          <Skeleton className="max-h-12 sm:max-h-[52px] w-full" />
        </div>
      </div>

      <div className="mt-16 flex justify-end">
        <Skeleton className="w-[180px] h-9" />
      </div>
    </>
  );
}

export default loading;
