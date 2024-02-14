import { Album } from "@/interfaces/album.interface";
import client, { database_service } from "@/lib/appwrite";
import { ALBUM_COLLECTION_ID, DATABASE_ID } from "@/lib/constants";
import { useEffect, useState } from "react";

export default function useAlbum(id: string, initialLoad: boolean = false) {
  const [data, setData] = useState<Album>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const response = await database_service.get<Album>(
        ALBUM_COLLECTION_ID,
        id,
      );

      setData(response);
      setLoading(false);
    };

    if (initialLoad) fetchData();

    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.${ALBUM_COLLECTION_ID}.documents`,
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
