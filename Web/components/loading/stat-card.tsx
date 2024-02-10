import { Skeleton } from "@/components/ui/skeleton";

export function StatCardLoading() {
  return (
    <div className="bg-background flex h-24 w-full flex-row gap-2 rounded-3xl border p-2">
      <Skeleton className="grid aspect-square h-full flex-nowrap place-items-center rounded-2xl" />
      <div className="flex w-full flex-col justify-between gap-4">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="mb-2 w-full flex-1" />
      </div>
    </div>
  );
}
