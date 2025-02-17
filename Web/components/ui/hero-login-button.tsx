"use client";

import { Loader } from "@/components/loading/loader";
import { Button } from "@/components/ui/button";
import { Spotify } from "@/components/ui/spotify";
import useAccount from "@/hooks/use-account";
import { auth_service } from "@/lib/appwrite";

export function HeroLoginButton() {
  const { data, loading } = useAccount(true);

  // return !data ? (
  //   <Button
  //     aria-label="Login in with Spotify"
  //     size="lg"
  //     className="relative z-10 flex flex-row gap-2"
  //     onClick={() => auth_service.createSpotifySession()}
  //     disabled={loading}
  //   >
  //     {loading && <Loader className="text-white" />}
  //     <Spotify variant="white" />
  //     Log In with Spotify
  //   </Button>
  // ) : null;

  return null;
}
