import { Play } from "@/interfaces/plays.interface";
import client, { database_service } from "@/lib/appwrite";
import { DATABASE_ID, PLAYS_COLLECTION_ID } from "@/lib/constants";
import { useEffect, useState } from "react";

export default function usePlay(id: string, initialLoad: boolean = false) {
  const [data, setData] = useState<Play>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const response = await database_service.get<Play>(
        PLAYS_COLLECTION_ID,
        id,
      );

      setData(response);
      setLoading(false);
    };

    if (initialLoad) fetchData();

    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.${PLAYS_COLLECTION_ID}.documents`,
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
