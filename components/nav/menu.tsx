"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LucideCassetteTape,
  LucideDisc2,
  LucideFileClock,
  LucideMoreVertical,
  LucidePersonStanding,
} from "lucide-react";
import Link from "next/link";

export function NavMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <LucideMoreVertical className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="text-base">Global</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link
              href={"/global/history"}
              className="flex w-full flex-row items-center gap-4 text-base"
            >
              <LucideFileClock size={16} />
              History
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={"/global/stats/track"}
              className="flex w-full flex-row items-center gap-4 text-base"
            >
              <LucideCassetteTape size={16} />
              Tracks
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={"/global/stats/album"}
              className="flex w-full flex-row items-center gap-4 text-base"
            >
              <LucideDisc2 size={16} />
              Albums
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={"/global/stats/artist"}
              className="flex w-full flex-row items-center gap-4 text-base"
            >
              <LucidePersonStanding size={16} />
              Artists
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
