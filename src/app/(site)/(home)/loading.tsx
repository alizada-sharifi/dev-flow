import { Skeleton } from "@/components/ui/skeleton";

function loading() {
  return (
    <section>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold">All Questions</h1>

        <Skeleton className="h-14 w-full sm:w-28" />
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <Skeleton className="h-14 flex-1 w-full" />
        <Skeleton className="h-14 w-full md:hidden" />
      </div>

      <div className="mt-10 hidden md:flex gap-3">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="w-1/4 h-10" />
        ))}
      </div>

      <div className="mt-12 space-y-6">
        <Skeleton className="w-full h-50" />
        <Skeleton className="w-full h-50" />
      </div>
    </section>
  );
}

export default loading;
