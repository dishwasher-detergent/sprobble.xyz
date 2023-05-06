"use client";

import { signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export function SpotifyAuth() {
  const { data: session } = useSession();

  if (session) {
    return <Logout />;
  }

  return <Login />;
}

export function Login() {
  function handleLogin() {
    signIn("spotify", {
      callbackUrl: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URL,
    });
  }

  return (
    <Button
      onClick={() => handleLogin()}
      className="bg-green-500 text-white font-bold hover:bg-green-600"
    >
      Login
    </Button>
  );
}

export function Logout() {
  function handleLogout() {
    signOut();
  }

  return (
    <Button
      onClick={() => handleLogout()}
      className="bg-green-500 text-white font-bold hover:bg-green-600"
    >
      Logout
    </Button>
  );
}
