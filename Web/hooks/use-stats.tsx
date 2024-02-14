import { Stat } from "@/interfaces/stats.interface";
import client, { database_service } from "@/lib/appwrite";
import { DATABASE_ID, STATS_COLLECTION_ID } from "@/lib/constants";
import { combineAndSumPlays } from "@/lib/utils";
import { useEffect, useState } from "react";

export interface YearToDate {
  name: string;
  plays: number;
  duration: string;
}

export default function useStats(
  queries: string[] = [],
  initialLoad: boolean = false,
) {
  const [yearToDate, setYearToDate] = useState<YearToDate[]>();
  const [data, setData] = useState<Stat[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await database_service.list<Stat>(
        STATS_COLLECTION_ID,
        queries,
      );

      const year_to_date = combineAndSumPlays(response.documents).map(
        (stat) => ({
          name: `Week ${stat.week_of_year}`,
          plays: stat.number_of_plays,
          duration: (
            Number(stat.time_spent_listening) /
            1000 /
            60 /
            60
          ).toFixed(2),
        }),
      );

      setYearToDate(year_to_date);
      setData(response.documents);
      setLoading(false);
    };

    if (initialLoad) fetchData();

    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.${STATS_COLLECTION_ID}.documents`,
      () => {
        fetchData();
      },
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    data,
    yearToDate,
    loading,
  };
}
