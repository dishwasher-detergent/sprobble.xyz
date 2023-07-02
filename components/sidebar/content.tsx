"use client";

import { LoginWithSpotify } from "@/components/login-with-spotify";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { useAccount } from "react-appwrite";

interface SidebarContentProps {
  onOpenChange?: (open: boolean) => void;
}

export function SidebarContent({ onOpenChange }: SidebarContentProps) {
  const { data: account } = useAccount();

  return (
    <>
      <div className="flex w-full items-center justify-center pb-8">
        <Logo />
      </div>
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-4">
          <ul>
            <li className="w-full px-0 py-2">
              <p className="text-sm font-bold uppercase text-slate-500">
                Global
              </p>
            </li>
            <li className="w-full">
              <ContentItem
                href={"/global/history"}
                onClick={() => onOpenChange?.(false)}
              >
                History
              </ContentItem>
            </li>
            <ul>
              <li className="w-full px-1 py-2">
                <p className="text-xs font-bold uppercase text-slate-500">
                  Stats
                </p>
              </li>
              <li className="w-full">
                <ContentItem
                  href={"/global/stats/track"}
                  onClick={() => onOpenChange?.(false)}
                >
                  Tracks
                </ContentItem>
              </li>
              <li className="w-full">
                <ContentItem
                  href={"/global/stats/album"}
                  onClick={() => onOpenChange?.(false)}
                >
                  Albums
                </ContentItem>
              </li>
              <li className="w-full">
                <ContentItem
                  href={"/global/stats/artist"}
                  onClick={() => onOpenChange?.(false)}
                >
                  Artists
                </ContentItem>
              </li>
            </ul>
          </ul>
          {account?.name && (
            <ul>
              <li className="w-full px-0 py-2">
                <p className="text-sm font-bold uppercase text-slate-500">
                  {account.name}
                </p>
              </li>
              <li className="w-full">
                <ContentItem
                  href={`/user/${account.$id}`}
                  onClick={() => onOpenChange?.(false)}
                >
                  History
                </ContentItem>
              </li>
            </ul>
          )}
        </nav>
      </ScrollArea>
      <ul>
        <li className="w-full px-4 py-2">
          <p className="text-sm font-bold uppercase text-slate-500">General</p>
        </li>
        <li>
          <LoginWithSpotify />
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
      size={"sm"}
      className="flex w-full flex-row justify-start"
      asChild
      onClick={onClick}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}
