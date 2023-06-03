"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount, useAppwrite } from "react-appwrite";

export default function AccountPage() {
  const { data: account, status } = useAccount();
  const accountService = useAppwrite().account;
  const router = useRouter();

  useEffect(() => {
    if (account?.name) {
      accountService.getSession("current").then((session) => {
        if (session.provider == "spotify") {
          accountService
            .updatePrefs({
              refresh_token: session.providerRefreshToken,
            })
            .then((response) => {
              router.push("/");
            });
        }
      });
    }
  }, [account]);

  return <div></div>;
}
