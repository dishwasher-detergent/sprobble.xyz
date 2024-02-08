"use client";

import { AudioPlayer } from "@/components/audio/player";
import DarkToggle from "@/components/darkToggle";
import { LoginWithSpotify } from "@/components/login-with-spotify";
import { Logo } from "@/components/logo";
import { NavMenu } from "@/components/nav/menu";
import Search from "@/components/search";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LucideSearch } from "lucide-react";
import Link from "next/link";

export function Nav() {
  return (
    <header className="border-b shadow-sm">
      <div className="mx-auto grid h-16 w-full max-w-7xl grid-cols-[10rem_1fr_auto] grid-rows-1 items-center gap-4 px-4 lg:grid-cols-[1fr_10rem_1fr]">
        <nav className="order-2 hidden flex-row md:flex lg:order-1">
          <Button variant="ghost" asChild>
            <Link href="/global/stats/album">Albums</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/global/stats/artist">Artists</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/global/stats/track">Tracks</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/global/leaderboard">Leaderboard</Link>
          </Button>
        </nav>
        <div className="order-1 lg:order-2">
          <Logo className="flex gap-4 md:flex-row md:items-center md:justify-center " />
        </div>
        <div className="order-3 hidden h-full items-center justify-end gap-1 md:flex">
          <Search />
          <LoginWithSpotify />
          <Separator orientation="vertical" className="h-1/2" />
          <DarkToggle />
        </div>
        <div className="order-3 flex justify-end gap-1 md:hidden">
          <Button size="icon" variant="ghost" asChild>
            <Link href="/search" aria-label="Go to search page">
              <LucideSearch className="h-5 w-5" />
            </Link>
          </Button>
          <NavMenu />
        </div>
      </div>
      <AudioPlayer />
    </header>
  );
}
