import { TotalStat } from "@/interfaces/total-stats.interface";
import client, { database_service } from "@/lib/appwrite";
import { DATABASE_ID, TOTAL_STATS_COLLECTION_ID } from "@/lib/constants";
import { useEffect, useState } from "react";

export default function useTotalStats(
  queries: string[] = [],
  initialLoad: boolean = false,
) {
  const [data, setData] = useState<TotalStat[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await database_service.list<TotalStat>(
        TOTAL_STATS_COLLECTION_ID,
        queries,
      );

      setData(response.documents);
      setLoading(false);
    };

    if (initialLoad) fetchData();

    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.${TOTAL_STATS_COLLECTION_ID}.documents`,
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
    loading,
  };
}
