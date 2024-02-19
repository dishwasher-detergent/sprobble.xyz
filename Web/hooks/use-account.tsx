import { User } from "@/interfaces/user.interface";
import client, {
  auth_service,
  database_service,
  storage_service,
} from "@/lib/appwrite";
import { AVATARS_BUCKET_ID, USER_COLLECTION_ID } from "@/lib/constants";
import { fetchAndSaveImage } from "@/lib/utils";
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
        console.log("test", res);
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

    console.log(account);
    console.log(session);

    if (session.provider == "spotify") {
      await auth_service.updatePrefs({
        refresh_token: session.providerRefreshToken,
      });

      let existingUser = null;

      try {
        existingUser = await database_service.get<User>(
          USER_COLLECTION_ID,
          account.$id,
        );
      } catch (error) {
        console.error(error);
      }

      if (!existingUser) {
        const image = await fetchAndSaveImage(
          `https://api.dicebear.com/6.x/thumbs/png?seed=${account.$id}&backgroundColor=fca5a5,fdba74,fcd34d,fde047,bef264,86efac,6ee7b7,5eead4,67e8f9,7dd3fc,93c5fd,a5b4fc,c4b5fd,d8b4fe,f0abfc,f9a8d4,fda4af&shapeColor=dc2626,ea580c,d97706,ca8a04,65a30d,16a34a,059669,0d9488,0891b2,0284c7,2563eb,4f46e5,7c3aed,9333ea,c026d3,db2777,e11d48`,
          `${account.$id}.png`,
        );

        const avatar = await storage_service.upload(AVATARS_BUCKET_ID, image);

        try {
          await database_service.create(
            USER_COLLECTION_ID,
            {
              user_id: account.$id,
              name: account.name,
              created_at: account.$createdAt,
              avatar: avatar.$id,
            },
            account.$id,
            [Permission.write(Role.user(account.$id))],
          );
        } catch (error) {
          console.error(error);
        }
      }

      return existingUser;
    }
  }

  return {
    data,
    loading,
    createAccount,
  };
}
