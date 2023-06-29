"use client";

import HistoryItem from "@/components/history/item";
import { Pagination } from "@/components/history/pagination";
import { HistoryLoading } from "@/components/loading/history";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Play } from "@/types/Types";
import { LucideCalendarClock } from "lucide-react";
import { DateRange, SelectRangeEventHandler } from "react-day-picker";

interface HistoryProps {
  title?: string;
  isLoading: boolean;
  formattedPlays: any;
  paginationProps?: {
    nextPage: () => void;
    prevPage: () => void;
    page: number;
    pageCount: number;
    itemCount: number;
    totalPlays: number;
  };
  dateProps?: {
    setDate: SelectRangeEventHandler;
    date: DateRange | undefined;
  };
}

export function History({
  title,
  isLoading,
  formattedPlays,
  paginationProps,
  dateProps,
}: HistoryProps) {
  return (
    <section>
      {title && (
        <div>
          <h2 className="mb-6 text-xl font-black md:text-3xl">{title}</h2>
        </div>
      )}
      {isLoading ? (
        <HistoryLoading />
      ) : (
        <>
          {dateProps && (
            <nav className="pb-6">
              <DatePickerWithRange
                date={dateProps.date}
                setDate={dateProps.setDate}
              />
            </nav>
          )}
          <ul className="flex flex-col gap-10">
            {formattedPlays.map((play: any) => (
              <div key={play.date}>
                <h3 className="flex items-center pb-4 text-base font-bold text-slate-400">
                  <LucideCalendarClock size={16} className="mr-2" />
                  {new Date(play.date).toLocaleDateString("en-us", {
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </h3>
                <ul className="ml-1.5 grid grid-cols-1 gap-4 border-l pl-4 md:grid-cols-2 lg:grid-cols-2">
                  {play.tracks.map((item: Play) => (
                    <li key={item.$id}>
                      <HistoryItem track={item} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </ul>
          {paginationProps && (
            <Pagination
              next={() => paginationProps.nextPage()}
              previous={() => paginationProps.prevPage()}
              page={paginationProps.page}
              pageCount={paginationProps.pageCount}
              // @ts-ignore
              resultCount={paginationProps.totalPlays}
              itemCount={paginationProps.itemCount}
            />
          )}
        </>
      )}
    </section>
  );
}
