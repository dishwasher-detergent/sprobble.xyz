"use client";

import { Loader } from "@/components/loading/loader";
import { avatarBucketId, databaseId, userCollectionId } from "@/lib/appwrite";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount, useAppwrite } from "react-appwrite";

export default function AccountPage() {
  const { data: account, status } = useAccount();
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

  async function createUser(account: any) {
    const session = await accountService.getSession("current");
    if (session.provider == "spotify") {
      await accountService.updatePrefs({
        refresh_token: session.providerRefreshToken,
      });

      let existingUser = null 
        
      try {
        existingUser = await databaseService.getDocument(
          databaseId,
          userCollectionId,
          account.$id
        );
      } catch (error) {
        console.log(error)
      }

      if (!existingUser) {
        const image = await fetchAndSaveImage(
          `https://api.dicebear.com/6.x/thumbs/png?seed=${account.$id}`,
          `${account.$id}.svg`
        );

        const avatar = await storageService.createFile(
          avatarBucketId,
          `${account.$id}`,
          image
        );

        const user = await databaseService.createDocument(
          databaseId,
          userCollectionId,
          account.$id,
          {
            user_id: account.$id,
            name: account.name,
            created_at: account.$createdAt,
            avatar: avatar.$id,
          }
        );
      }

      router.push("/");
    }
  }

  useEffect(() => {
    if (account?.name) {
      createUser(account);
    }
  }, [account]);

  return (
    <section className="flex flex-row items-center gap-2">
      <Loader />
      <h1 className="text-3xl font-bold">
        Getting everything setup just for you!
      </h1>
    </section>
  );
}
