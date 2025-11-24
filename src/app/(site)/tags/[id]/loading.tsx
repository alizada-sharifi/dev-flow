import { Skeleton } from "@/components/ui/skeleton";

function loading() {
  return (
    <>
      <Skeleton className="w-40 h-15" />

      <Skeleton className="w-full mt-11 h-15" />

      <div className="mt-12 space-y-6">
        <Skeleton className="w-full h-50" />
        <Skeleton className="w-full h-50" />
      </div>
    </>
  );
}

export default loading;
