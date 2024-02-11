import { Artist } from "@/interfaces/artist.interface";
import client, { database_service } from "@/lib/appwrite";
import { ARTIST_COLLECTION_ID, DATABASE_ID } from "@/lib/constants";
import { useEffect, useState } from "react";

export default function useArtist(id: string) {
  const [data, setData] = useState<Artist>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const response = await database_service.get<Artist>(
        ARTIST_COLLECTION_ID,
        id,
      );

      setData(response);
      setLoading(false);
    };

    fetchData();

    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.${ARTIST_COLLECTION_ID}.documents`,
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
