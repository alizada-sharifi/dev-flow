import { Skeleton } from "@/components/ui/skeleton";

function loading() {
  return (
    <div className="flex items-center justify-start w-full flex-col">
      <div className="flex w-full flex-col-reverse justify-between">
        <Skeleton className="w-28 h-5.5" />

        <div className="flex justify-end items-center gap-4">
          <Skeleton className="w-34 h-5" />
        </div>
      </div>

      <div className="mt-3.5 w-full space-y-2">
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-1/2 h-4" />
      </div>
      <Skeleton className="w-full h-60 mt-8" />
    </div>
  );
}

export default loading;
