"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppwrite } from "react-appwrite";

interface UnlinkFromSpotifyFormProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function LinkToSpotify({
  className,
  ...props
}: UnlinkFromSpotifyFormProps) {
  const [loading, isLoading] = useState<boolean>(false);
  const accountService = useAppwrite().account;

  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("code")) {
      isLoading(true);
      (async () => {
        await fetch("/api/spotify/callback", {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify({ code: searchParams.get("code") as string }),
        })
          .then((response) => response.json())
          .then(async (data) => {
            console.log(data);
            if (data.refresh_token) {
              await accountService
                .updatePrefs({
                  refresh_token: data.refresh_token,
                })
                .then(() => {
                  isLoading(false);
                });
            }
          });
      })();
    }
  }, [searchParams]);

  const linkToSpotify = async () => {
    isLoading(true);
    const session = await accountService.getSession("current");

    if (!session) {
      location.href = `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}&scope=user-read-currently-playing+user-read-recently-played&redirect_uri=${process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URL}`;
    }

    if (session.provider === "spotify") {
      await accountService.updatePrefs({
        refresh_token: session.providerRefreshToken,
      });
    }
    isLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spotify</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Button
            disabled={loading}
            variant="default"
            className="bg-green-500 hover:bg-green-600"
            onClick={() => linkToSpotify()}
          >
            Link To Spotify
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
