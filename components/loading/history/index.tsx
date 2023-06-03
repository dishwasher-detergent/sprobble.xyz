"use client";

import HistoryItemLoading from "@/components/loading/history/item";
import { Skeleton } from "@/components/ui/skeleton";
import { LucideCalendarClock } from "lucide-react";

export function HistoryLoading() {
  return (
    <ul className="flex flex-col gap-10">
      {[...new Array(2)].map((val: any, index: number) => (
        <div key={index}>
          <h3 className="flex items-center pb-4 text-base font-bold text-slate-400">
            <LucideCalendarClock size={16} className="mr-2" />
            <Skeleton className="h-6 w-full max-w-[150px]" />
          </h3>
          <ul className="ml-1.5 flex flex-col gap-2 border-l pl-4">
            {[...new Array(5)].map((val: any, index: number) => (
              <li key={index}>
                <HistoryItemLoading />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </ul>
  );
}
