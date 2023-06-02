import { Skeleton } from "@/components/ui/skeleton";

export default function HistoryItemLoading() {
  return (
    <article>
      <div className="relative flex flex-row items-start gap-2 rounded-lg p-1">
        <Skeleton className="h-24 w-24 rounded-lg" />
        <div className="h-24 flex flex-col gap-1">
          <Skeleton className="h-4 w-[200px] max-w-full" />
          <Skeleton className="h-6 w-[250px] max-w-full" />
          <Skeleton className="h-4 w-[150px] max-w-full" />
            <div className="flex flex-row gap-1">
                <Skeleton className="h-4 w-[75px]" />
                <Skeleton className="h-4 w-[75px]" />
                <Skeleton className="h-4 w-[75px]" />
            </div>
        </div>
      </div>
        <div className="text-slate-300 flex items-center text-sm">
          Listened by&nbsp;
          <Skeleton className="h-4 w-[150px]" />
        </div>
    </article>
  );
}
