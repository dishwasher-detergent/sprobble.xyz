"use client";

import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { useEmailSignIn, useOAuth2SignIn } from "react-appwrite/account";

export function UserAuthForm() {
  const signIn = useEmailSignIn();
  const oAuthSignIn = useOAuth2SignIn();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    signIn.mutateAsync({
      email: username,
      password: password,
    });
  }

  return (
    <div className="grid h-full w-full place-items-center">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="w-72 max-w-full">
            <div className="grid gap-4">
              <div className="grid gap-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={signIn.isLoading}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="abc123"
                  type="password"
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect="off"
                  disabled={signIn.isLoading}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button disabled={signIn.isLoading}>
                {signIn.isLoading && (
                  <Loader className="mr-4 h-full text-white" />
                )}
                Sign In with Email
              </Button>
            </div>
          </form>
          <Separator orientation="horizontal" className="my-4" />
          <Button
            className="w-full bg-green-500 text-white"
            onClick={() =>
              oAuthSignIn.mutateAsync({
                provider: "spotify",
                successUrl: "https://sprobble.xyz/account/preferences",
                failureUrl: "https://sprobble.xyz/account/login",
                scopes: [
                  "user-read-currently-playing",
                  "user-read-recently-played",
                ],
              })
            }
          >
            Login with Spotify
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
