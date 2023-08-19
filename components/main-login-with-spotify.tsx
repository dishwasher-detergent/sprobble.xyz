"use client";

import { Button } from "@/components/ui/button";
import { useAccount, useOAuth2SignIn } from "react-appwrite";

export function MainLoginWithSpotify() {
  const oAuthSignIn = useOAuth2SignIn();
  const { data: account, status } = useAccount();

  return !account?.name ? (
    <Button
      aria-label="Sign in with Spotify"
      size="lg"
      className="flex flex-row gap-2"
      onClick={() =>
        oAuthSignIn.mutateAsync({
          provider: "spotify",
          successUrl: `https://sprobble.xyz/account`,
          failureUrl: `https://sprobble.xyz`,
          scopes: [
            "user-read-currently-playing",
            "user-read-recently-played",
            "user-read-email",
            "user-read-private",
          ],
        })
      }
    >
      Get started by signing in with Spotify
      <img
        className="block dark:hidden"
        src="/spotify/icon/Spotify_Icon_RGB_Black.png"
        alt="Spotify Icon Logo"
        width={16}
        height={16}
      />
      <img
        className="hidden dark:block"
        src="/spotify/icon/Spotify_Icon_RGB_White.png"
        alt="Spotify Icon Logo"
        width={16}
        height={16}
      />
    </Button>
  ) : null;
}
