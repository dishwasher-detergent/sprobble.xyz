import { User } from "@/interfaces/user.interface";
import client, { database_service } from "@/lib/appwrite";
import { DATABASE_ID, USER_COLLECTION_ID } from "@/lib/constants";
import { useEffect, useState } from "react";

export default function useUsers(
  queries: string[] = [],
  initialLoad: boolean = false,
) {
  const [data, setData] = useState<User[]>();
  const [total, setTotal] = useState<number>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const response = await database_service.list<User>(
        USER_COLLECTION_ID,
        queries,
      );

      setData(response.documents);
      setTotal(response.total);
      setLoading(false);
    };

    if (initialLoad) fetchData();

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
    total,
    loading,
  };
}
