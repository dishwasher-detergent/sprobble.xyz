"use client";

import { LucideLogIn } from "lucide-react";
import { useAccount, useOAuth2SignIn, useSignOut } from "react-appwrite";
import { Button } from "./ui/button";

export function LoginWithSpotify() {
  const oAuthSignIn = useOAuth2SignIn();
  const signOut = useSignOut();
  const { data: account, status } = useAccount();

  return account?.name ? (
    <Button
      variant="ghost"
      className="flex w-full flex-row justify-start text-base"
      onClick={() => {
        signOut.mutateAsync();
      }}
    >
      <LucideLogIn className="mr-2 h-4 w-4" />
      Logout
    </Button>
  ) : (
    <Button
      className="flex w-full flex-row justify-start bg-[#1DB954] text-base hover:bg-green-500"
      onClick={() =>
        oAuthSignIn.mutateAsync({
          provider: "spotify",
          successUrl: `${window.location.origin}/account`,
          failureUrl: `${window.location.origin}`,
          scopes: [
            "user-read-currently-playing",
            "user-read-recently-played",
            "user-read-email",
          ],
        })
      }
    >
      Login with Spotify
    </Button>
  );
}
