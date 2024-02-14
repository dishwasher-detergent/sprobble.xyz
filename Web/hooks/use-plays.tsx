import { PlayMinified } from "@/interfaces/plays-minified.interface";
import client, { database_service } from "@/lib/appwrite";
import { DATABASE_ID, PLAYS_MINIFIED_COLLECTION_ID } from "@/lib/constants";
import { useEffect, useState } from "react";

export default function usePlays(
  queries: string[] = [],
  initialLoad: boolean = false,
) {
  const [data, setData] = useState<PlayMinified[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const response = await database_service.list<PlayMinified>(
        PLAYS_MINIFIED_COLLECTION_ID,
        queries,
      );

      setData(response.documents);
      setLoading(false);
    };

    if (initialLoad) fetchData();

    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.${PLAYS_MINIFIED_COLLECTION_ID}.documents`,
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
