"use client";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { LucideGithub } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-4 w-full border-t bg-background bg-slate-50 p-4 text-slate-900 dark:bg-slate-900 dark:text-white">
      <div className="pb-4">
        <Logo />
      </div>
      <div className="flex flex-row flex-wrap items-start justify-between">
        <div className="text-sm">
          <p>All track/artist/album data is sourced from the Spotify API.</p>
          <p>All statistics are sourced from Sprobble users.</p>
        </div>
        <div className="flex flex-row">
          <Button asChild size="icon" variant="ghost">
            <a
              href="https://github.com/dishwasher-detergent/sprobble.xyz"
              target="_blank"
            >
              <LucideGithub size={16} />
            </a>
          </Button>
        </div>
      </div>
    </footer>
  );
}
