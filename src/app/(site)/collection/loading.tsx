import { Skeleton } from "@/components/ui/skeleton";

function loading() {
  return (
    <>
      <h1 className="h1-bold">Saved Questions</h1>

      <section className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <Skeleton className="h-14 w-full flex-1" />
        <Skeleton className="h-14 w-full sm:w-28" />
      </section>

      <div className="mt-12 space-y-6">
        <Skeleton className="w-full h-50" />
        <Skeleton className="w-full h-50" />
      </div>
    </>
  );
}

export default loading;
