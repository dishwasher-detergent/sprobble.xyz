"use client";

import HistoryItem from "@/components/history/item";
import { Pagination } from "@/components/history/pagination";
import { HistoryLoading } from "@/components/loading/history";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Play } from "@/types/Types";
import { LucideCalendarClock } from "lucide-react";
import { DateRange, SelectRangeEventHandler } from "react-day-picker";
import Title from "../layout/title";

interface HistoryProps {
  title?: string;
  isLoading: boolean;
  formattedPlays: any;
  paginationProps?: {
    page: number;
    pageCount: number;
    itemCount: number;
    totalPlays?: number;
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
        <h2 className="flex flex-row items-center gap-2 pb-4 text-xl font-black text-muted-foreground md:text-3xl">
          {title}
        </h2>
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
              <li key={play.date}>
                <Title
                  className="pb-4"
                  icon={<LucideCalendarClock size={16} />}
                >
                  {new Date(play.date).toLocaleDateString("en-us", {
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </Title>
                <ul className="flex flex-row flex-wrap gap-4">
                  {play.tracks.map(
                    (item: Play) =>
                      item.track && <HistoryItem key={item.$id} track={item} />
                  )}
                </ul>
              </li>
            ))}
          </ul>
          {paginationProps && (
            <Pagination
              page={paginationProps.page}
              pageCount={paginationProps.pageCount}
              isLoading={isLoading}
            />
          )}
        </>
      )}
    </section>
  );
}
