"use client";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LucideLogIn, LucideLogOut, LucideUser } from "lucide-react";
import Link from "next/link";
import { useAccount, useSignOut } from "react-appwrite";

export function SidebarContent() {
  const { data: account } = useAccount();
  const signOut = useSignOut();

  return (
    <>
      <div className="flex w-full items-center justify-center pb-8">
        <Logo />
      </div>
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-4">
          <ul>
            <li className="w-full px-4 py-2">
              <p className="text-sm font-bold uppercase text-slate-400">
                Global
              </p>
            </li>
            <li className="w-full">
              <ContentItem href={"/global/history"}>History</ContentItem>
            </li>
            {/* <li className="w-full">
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
            </li> */}
          </ul>
          {account && (
            <ul>
              <li className="w-full px-4 py-2">
                <p className="text-sm font-bold uppercase text-slate-400">
                  {account.name}
                </p>
              </li>
              <li className="w-full">
                <ContentItem href={`/${account.$id}/history`}>
                  History
                </ContentItem>
              </li>
              {/* <li className="w-full">
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
              </li> */}
            </ul>
          )}
        </nav>
      </ScrollArea>
      <ul>
        <li className="w-full px-4 py-2">
          <p className="text-sm font-bold uppercase text-slate-400">General</p>
        </li>
        {account && (
          <li>
            <ContentItem href="/account/preferences">
              <LucideUser className="mr-2 h-4 w-4" />
              Account
            </ContentItem>
          </li>
        )}
        <li>
          {account ? (
            <ContentItem
              href="/account/login"
              onClick={() => {
                signOut.mutateAsync();
              }}
            >
              <LucideLogIn className="mr-2 h-4 w-4" />
              Logout
            </ContentItem>
          ) : (
            <ContentItem href="/account/login">
              <LucideLogOut className="mr-2 h-4 w-4" />
              Login
            </ContentItem>
          )}
        </li>
      </ul>
    </>
  );
}

interface ContentItemProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

function ContentItem({ href, children, onClick }: ContentItemProps) {
  return (
    <Button
      variant="ghost"
      className="flex w-full flex-row justify-start text-base"
      asChild
      onClick={onClick}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}
