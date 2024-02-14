"use client";

import StatsGraph from "@/components/ui/stats-graph";
import useStats, { YearToDate } from "@/hooks/use-stats";
import { Query } from "appwrite";
import { useEffect, useState } from "react";

interface GlobalSongsProps {
  initial: YearToDate[];
}

export function GlobalWeekToWeek({ initial }: GlobalSongsProps) {
  const [data, setData] = useState<YearToDate[]>(initial);

  const { yearToDate, loading: stats_loading } = useStats([
    Query.orderAsc("week_of_year"),
    Query.equal("user_id", "global"),
    Query.select([
      "number_of_plays",
      "user_id",
      "time_spent_listening",
      "week_of_year",
    ]),
  ]);

  useEffect(() => {
    if (yearToDate) {
      setData(yearToDate);
    }
  }, [yearToDate]);

  return <StatsGraph stats={data} />;
}
