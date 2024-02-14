"use client";

import { Loader } from "@/components/loading/loader";
import { Button } from "@/components/ui/button";
import useAccount from "@/hooks/use-account";
import { auth_service } from "@/lib/appwrite";

export function LoginButton() {
  const { data, loading } = useAccount(true);

  return !data ? (
    <Button
      aria-label="Login in with Spotify"
      size="sm"
      className="flex flex-row gap-2"
      onClick={() => auth_service.createSpotifySession()}
      disabled={loading}
    >
      {loading && <Loader className="text-white" />}
      Log In
    </Button>
  ) : (
    <Button
      aria-label="Sign Out"
      size="sm"
      variant="secondary"
      className="flex flex-row gap-2"
      onClick={() => auth_service.signOut()}
      disabled={loading}
    >
      {loading && <Loader className="text-white" />}
      Log Out
    </Button>
  );
}
