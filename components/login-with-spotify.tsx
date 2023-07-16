"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserTag from "@/components/user/tag";
import { LucideLogIn, LucideUser } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAccount, useOAuth2SignIn, useSignOut } from "react-appwrite";

export function LoginWithSpotify() {
  const oAuthSignIn = useOAuth2SignIn();
  const { data: account, status } = useAccount();

  return account?.name ? (
    <UserDropDown userId={account.$id} />
  ) : (
    <Button
      className="flex flex-row items-center gap-4"
      variant="ghost"
      size="sm"
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
      Login
      <Image
        className="block dark:hidden"
        src="/spotify/icon/Spotify_Icon_RGB_Black.png"
        alt="Spotify Icon Logo"
        width={16}
        height={16}
        sizes="(max-width: 16px) 100vw"
      />
      <Image
        className="hidden dark:block"
        src="/spotify/icon/Spotify_Icon_RGB_White.png"
        alt="Spotify Icon Logo"
        width={16}
        height={16}
        sizes="(max-width: 16px) 100vw"
      />
    </Button>
  );
}

function UserDropDown({ userId }: { userId: string }) {
  const signOut = useSignOut();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="font-bold">
          <UserTag userId={userId} hover={false} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>
          <Link
            href={`/user/${userId}`}
            className="flex w-full flex-row items-center justify-between text-base"
          >
            Account
            <LucideUser className="mr-2 h-4 w-4" />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button
            className="flex w-full flex-row items-center justify-between text-base"
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
