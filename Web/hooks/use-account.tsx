import { User } from "@/interfaces/user.interface";
import client, { auth_service, database_service } from "@/lib/appwrite";
import { USER_COLLECTION_ID } from "@/lib/constants";
import { Permission, Role } from "appwrite";
import { useEffect, useState } from "react";

export default function useAccount(initialLoad: boolean = false) {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await auth_service.getAccount();

        setData(response);
      } catch (error) {
        console.error("User not logged in.");
      }

      setLoading(false);
    };

    if (initialLoad) fetchData();

    const unsubscribe = client.subscribe(`account`, (res) => {
      if (res.events.filter((x) => x.includes("delete")).length > 0) {
        setData(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function createAccount() {
    const account = await auth_service.getAccount();
    const session = await auth_service.getSession();

    if (session.provider == "spotify") {
      await auth_service.updatePrefs({
        refresh_token: session.providerRefreshToken,
      });

      const response = await fetch(
        `https://api.spotify.com/v1/users/${session.providerUid}`,
        {
          headers: {
            Authorization: `Bearer ${session.providerAccessToken}`,
          },
        },
      );
      const result = await response.json();

      console.log(result);

      try {
        await database_service.get<User>(USER_COLLECTION_ID, account.$id);

        await database_service.update(
          USER_COLLECTION_ID,
          {
            avatar: result.images[1].url ?? null,
          },
          account.$id,
        );
      } catch (error) {
        await database_service.create(
          USER_COLLECTION_ID,
          {
            user_id: account.$id,
            name: account.name,
            created_at: account.$createdAt,
            avatar: result.images[0] ?? null,
            spotify_user_id: session.providerUid,
          },
          account.$id,
          [Permission.write(Role.user(account.$id))],
        );
      }
    }
  }

  return {
    data,
    loading,
    createAccount,
  };
}
