import { PlaySmall } from "@/interfaces/plays-small.interface";
import client, { database_service } from "@/lib/appwrite";
import { DATABASE_ID, PLAYS_SMALL_COLLECTION_ID } from "@/lib/constants";
import { useEffect, useState } from "react";

export default function usePlays(queries: string[] = []) {
  const [data, setData] = useState<PlaySmall[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const response = await database_service.list<PlaySmall>(
        PLAYS_SMALL_COLLECTION_ID,
        queries,
      );

      setData(response.documents);
      setLoading(false);
    };

    fetchData();

    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.${PLAYS_SMALL_COLLECTION_ID}.documents`,
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
