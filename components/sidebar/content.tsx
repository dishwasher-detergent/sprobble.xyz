"use client";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { LucideLogIn, LucideLogOut, LucideUser } from "lucide-react";
import Link from "next/link";
import { useAccount, useSignOut } from "react-appwrite";
import { ScrollArea } from "@/components/ui/scroll-area";

export function SidebarContent() {
  const { data: account, isLoading } = useAccount();
  const signOut = useSignOut();

  return (
    <>
      <div className="flex w-full items-center justify-center pb-8">
        <Logo />
      </div>
      <ScrollArea className="flex-1">
        <nav>
          <ul>
            <li className="w-full px-4 py-2">
              <p className="text-sm font-bold uppercase text-slate-400">
                Global
              </p>
            </li>
            <li className="w-full">
              <Button
                variant="ghost"
                className="w-full justify-start text-base"
              >
                Track
              </Button>
            </li>
            <li className="w-full">
              <Button
                variant="ghost"
                className="w-full justify-start text-base"
              >
                Artist
              </Button>
            </li>
            <li className="w-full">
              <Button
                variant="ghost"
                className="w-full justify-start text-base"
              >
                Album
              </Button>
            </li>
          </ul>
        </nav>
      </ScrollArea>
      <ul>
        <li className="w-full px-4 py-2">
          <p className="text-sm font-bold uppercase text-slate-400">General</p>
        </li>
        {account && (
          <li>
            <Button
              variant="ghost"
              className="w-full justify-start text-base"
              asChild
            >
              <Link href="/account/preferences">
                <LucideUser className="mr-2 h-4 w-4" />
                Account
              </Link>
            </Button>
          </li>
        )}
        <li>
          {account ? (
            <Button
              variant="ghost"
              className="w-full justify-start text-base"
              onClick={() => {
                signOut.mutateAsync();
              }}
            >
              <LucideLogIn className="mr-2 h-4 w-4" />
              Logout
            </Button>
          ) : (
            <Button
              variant="ghost"
              className="w-full justify-start text-base"
              asChild
            >
              <Link href="/account/login">
                <LucideLogOut className="mr-2 h-4 w-4" />
                Login
              </Link>
            </Button>
          )}
        </li>
      </ul>
    </>
  );
}
