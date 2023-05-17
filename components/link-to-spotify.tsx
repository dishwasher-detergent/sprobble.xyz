"use client";

import { useAppwrite } from "react-appwrite";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import { useSearchParams } from "next/navigation";

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
            asChild
          >
            <a
              href={`https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}&scope=user-read-recently-played+user-read-playback-state+user-top-read+user-modify-playback-state+user-read-currently-playing+user-follow-read+playlist-read-private+user-read-email+user-read-private+user-library-read+playlist-read-collaborative&redirect_uri=${process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URL}`}
            >
              {loading && <Loader className="text-white h-full mr-4" />}
              Link To Spotify
            </a>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
