"use client";

import React, { useState } from "react";
import { useEmailSignIn } from "react-appwrite/account";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loader from "@/components/Loader";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const signIn = useEmailSignIn();
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
    <div className={cn("grid gap-6", className)} {...props}>
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
            {signIn.isLoading && <Loader className="text-white h-full mr-4" />}
            Sign In with Email
          </Button>
        </div>
      </form>
    </div>
  );
}
