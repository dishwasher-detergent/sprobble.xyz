"use client";

import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { SpotifyAuth } from "../Spotify/Auth";

export function Nav() {
  return (
    <header className="border-b border-slate-300 py-2 w-full">
      <div className="max-w-7xl mx-auto px-2 md:px-8 flex flex-row justify-between items-center">
        <h1 className="font-bold text-xl">Spotify Wrangler</h1>
        <NavigationMenu className="justify-end">
          <NavigationMenuList>
            <NavigationMenuItem>
              <SpotifyAuth />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
