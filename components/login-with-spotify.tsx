"use client";

import { Button } from "@/components/ui/button";
import { LucideLogIn } from "lucide-react";
import { useAccount, useOAuth2SignIn, useSignOut } from "react-appwrite";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import UserTag from "./user/tag";

export function LoginWithSpotify() {
  const oAuthSignIn = useOAuth2SignIn();
  const { data: account, status } = useAccount();

  return account?.name ? (
    <UserDropDown userId={account.$id} />
  ) : (
    <Button
      variant="ghost"
      size="sm"
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

function UserDropDown({ userId }: { userId: string }) {
  const signOut = useSignOut();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="font-bold">
          <UserTag userId={userId} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="text-base">Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button
            className="flex w-full flex-row justify-between text-base"
            onClick={() => {
              signOut.mutateAsync();
            }}
          >
            Logout
            <LucideLogIn className="mr-2 h-4 w-4" />
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
