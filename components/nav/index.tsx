"use client";

import Link from "next/link";
import { LoginWithSpotify } from "../login-with-spotify";
import { Button } from "../ui/button";
import { NavMenu } from "./menu";

export function Nav() {
  return (
    <header className="mx-auto grid h-16 w-full max-w-7xl grid-cols-[10rem_1fr_auto] grid-rows-1 items-center gap-4 px-4 lg:grid-cols-[1fr_10rem_1fr]">
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
          <Link href="/global/history">History</Link>
        </Button>
      </nav>
      <Link href={"/"} className="order-1 lg:order-2">
        <h1 className="flex flex-row items-center justify-center gap-2 text-xl font-black uppercase text-blue-600">
          Sprobble
        </h1>
      </Link>
      <div className="order-3 flex justify-end">
        <LoginWithSpotify />
        <NavMenu />
      </div>
    </header>
  );
}
