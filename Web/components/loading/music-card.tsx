import { Skeleton } from "@/components/ui/skeleton";
import { LucideDot } from "lucide-react";

export function MusicCardLoading() {
  return (
    <article className="flex flex-col gap-4 rounded-3xl border p-2">
      <div className="flex flex-row gap-4 md:flex-col">
        <Skeleton className="aspect-square w-36 flex-none overflow-hidden rounded-2xl md:w-full" />
        <div className="flex w-full flex-col gap-1 overflow-hidden">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="my-2 h-4 w-1/2" />
        </div>
      </div>
      <div className="w-full flex-row overflow-hidden rounded-full bg-slate-100 p-1 pr-4 text-slate-800">
        <div className="flex flex-row items-center text-xs md:text-sm">
          <div className="flex flex-1 flex-row flex-nowrap items-center gap-2">
            <Skeleton className="aspect-square h-6 w-6 flex-none overflow-hidden rounded-full md:h-8 md:w-8" />
            <Skeleton className="h-4 flex-1" />
          </div>
          <LucideDot className="h-6 w-6 flex-none" />
          <Skeleton className="h-4 flex-1" />
        </div>
      </div>
    </article>
  );
}
