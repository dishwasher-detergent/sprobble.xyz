import { Skeleton } from "@/components/ui/skeleton";

export default function HistoryItemLoading() {
  return (
    <article>
      <div className="relative flex flex-row items-start gap-2 rounded-lg p-1">
        <Skeleton className="h-24 w-24 rounded-lg" />
        <div className="flex h-24 flex-col gap-1">
          <Skeleton className="h-4 w-full max-w-[200px]" />
          <Skeleton className="h-6 w-full max-w-[250px]" />
          <Skeleton className="h-4 w-full max-w-[150px]" />
          <div className="flex flex-row gap-1">
            <Skeleton className="h-4 w-[75px]" />
            <Skeleton className="h-4 w-[75px]" />
            <Skeleton className="h-4 w-[75px]" />
          </div>
        </div>
      </div>
      <div className="flex items-center text-sm text-slate-300">
        Listened by&nbsp;
        <Skeleton className="h-4 w-full max-w-[150px]" />
      </div>
    </article>
  );
}
