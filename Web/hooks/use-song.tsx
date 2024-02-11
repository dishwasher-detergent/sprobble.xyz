import { Track } from "@/interfaces/track.interface";
import client, { database_service } from "@/lib/appwrite";
import { DATABASE_ID, TRACK_COLLECTION_ID } from "@/lib/constants";
import { useEffect, useState } from "react";

export default function useSong(id: string) {
  const [data, setData] = useState<Track>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const response = await database_service.get<Track>(
        TRACK_COLLECTION_ID,
        id,
      );

      setData(response);
      setLoading(false);
    };

    fetchData();

    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.${TRACK_COLLECTION_ID}.documents`,
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
