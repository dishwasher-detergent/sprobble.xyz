"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import UserTag from "@/components/user/tag";
import { databaseId, userCollectionId } from "@/lib/appwrite";
import { User } from "@/types/Types";
import { LucideLogIn, LucideUser } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import {
  useAccount,
  useAppwrite,
  useOAuth2SignIn,
  useSignOut,
} from "react-appwrite";

export function LoginWithSpotify() {
  const oAuthSignIn = useOAuth2SignIn();
  const { data: account, status } = useAccount();
  const databaseService = useAppwrite().databases;
  const accountService = useAppwrite().account;
  const { toast } = useToast();

  const checkAccount = async () => {
    const account = await accountService.get();

    try {
      const user = await databaseService.getDocument<User>(
        databaseId,
        userCollectionId,
        account.$id
      );

      if (!user.authorized) {
        toast({
          title: "Unauthorized",
          description:
            "Your account has not been authorized yet, you can view sprobbles but not create them.",
          variant: "destructive",
        });
        await accountService.deleteSession("current");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkAccount();
  }, []);

  return account?.name ? (
    <UserDropDown userId={account.$id} />
  ) : (
    <Button
      aria-label="Sign in with Spotify"
      className="flex flex-none flex-row items-center gap-4 px-4"
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
      Sign In
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
            aria-label="Sign out of account"
            className="flex w-full flex-row items-center justify-between text-base"
            onClick={() => {
              signOut.mutateAsync();
            }}
          >
            Sign Out
            <LucideLogIn className="mr-2 h-4 w-4" />
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
