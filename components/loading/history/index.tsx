"use client";

import HistoryItemLoading from "@/components/loading/history/item";
import { Skeleton } from "@/components/ui/skeleton";
import { LucideCalendarClock } from "lucide-react";

export function HistoryLoading() {
  return (
    <ul className="flex flex-col gap-10">
      {[...new Array(2)].map((val: any, index: number) => (
        <div key={index}>
          <h3 className="flex items-center pb-4 text-base font-bold text-slate-500">
            <LucideCalendarClock size={16} className="mr-2" />
            <Skeleton className="h-6 w-full max-w-[150px]" />
          </h3>
          <ul className="flex flex-row flex-wrap gap-4">
            {[...new Array(5)].map((val: any, index: number) => (
              <HistoryItemLoading key={index} />
            ))}
          </ul>
        </div>
      ))}
    </ul>
  );
}
