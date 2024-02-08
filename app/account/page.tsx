"use client";

import { Loader } from "@/components/loading/loader";
import {
  AVATAR_BUCKET_ID,
  DATABASE_ID,
  USER_COLLECTION_ID,
} from "@/lib/constants";
import { ID } from "appwrite";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppwrite } from "react-appwrite";

export default function AccountPage() {
  const storageService = useAppwrite().storage;
  const accountService = useAppwrite().account;
  const databaseService = useAppwrite().databases;
  const router = useRouter();

  async function fetchAndSaveImage(
    url: string,
    filename: string
  ): Promise<File> {
    const response = await fetch(url);
    const blob = await response.blob();
    const file = new File([blob], filename, { type: blob.type });
    return file;
  }

  async function createUser() {
    const session = await accountService.getSession("current");
    const account = await accountService.get();
    if (session.provider == "spotify") {
      await accountService.updatePrefs({
        refresh_token: session.providerRefreshToken,
      });

      let existingUser = null;

      try {
        existingUser = await databaseService.getDocument(
          DATABASE_ID,
          USER_COLLECTION_ID,
          account.$id
        );
      } catch (error) {
        console.log(error);
      }

      if (!existingUser) {
        const image = await fetchAndSaveImage(
          `https://api.dicebear.com/6.x/thumbs/png?seed=${account.$id}&backgroundColor=fca5a5,fdba74,fcd34d,fde047,bef264,86efac,6ee7b7,5eead4,67e8f9,7dd3fc,93c5fd,a5b4fc,c4b5fd,d8b4fe,f0abfc,f9a8d4,fda4af&shapeColor=dc2626,ea580c,d97706,ca8a04,65a30d,16a34a,059669,0d9488,0891b2,0284c7,2563eb,4f46e5,7c3aed,9333ea,c026d3,db2777,e11d48`,
          `${account.$id}.png`
        );

        const avatar = await storageService.createFile(
          AVATAR_BUCKET_ID,
          ID.unique(),
          image
        );

        try {
          await databaseService.createDocument(
            DATABASE_ID,
            USER_COLLECTION_ID,
            account.$id,
            {
              user_id: account.$id,
              name: account.name,
              created_at: account.$createdAt,
              avatar: avatar.$id,
              refresh_token: session.providerRefreshToken,
            }
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await databaseService.updateDocument(
            DATABASE_ID,
            USER_COLLECTION_ID,
            account.$id,
            {
              refresh_token: session.providerRefreshToken,
            }
          );
        } catch (error) {
          console.log(error);
        }
      }

      router.push("/");
    }
  }

  useEffect(() => {
    createUser();
  }, []);

  return (
    <section className="flex flex-row items-center gap-2">
      <Loader />
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Getting everything setup just for you!
      </h1>
    </section>
  );
}
