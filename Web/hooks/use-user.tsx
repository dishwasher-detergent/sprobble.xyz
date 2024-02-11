import { User } from "@/interfaces/user.interface";
import client, { database_service } from "@/lib/appwrite";
import { DATABASE_ID, USER_COLLECTION_ID } from "@/lib/constants";
import { useEffect, useState } from "react";

export default function useUser(id: string) {
  const [data, setData] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const response = await database_service.get<User>(USER_COLLECTION_ID, id);

      setData(response);
      setLoading(false);
    };

    fetchData();

    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.${USER_COLLECTION_ID}.documents`,
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
