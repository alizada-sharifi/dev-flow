import { Skeleton } from "@/components/ui/skeleton";

function loading() {
  return (
    <>
      <h1 className="h1-bold text-3xl">Tags</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <Skeleton className="h-14 w-full flex-1" />
        <Skeleton className="h-14 w-full sm:w-28" />
      </div>

      <div className="flex flex-wrap gap-5 mt-12">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <Skeleton key={i} className="h-60 w-full rounded-2xl sm:w-[230px]" />
        ))}
      </div>
    </>
  );
}

export default loading;
