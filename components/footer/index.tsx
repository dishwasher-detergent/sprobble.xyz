"use client";

import DarkToggle from "@/components/darkToggle";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { LucideGithub } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-4 w-full border-t bg-background bg-slate-50 p-4 text-slate-900 dark:bg-slate-900 dark:text-white">
      <div className="mx-auto max-w-7xl">
        <div className="pb-4">
          <Logo />
        </div>
        <div className="flex flex-row flex-wrap items-start justify-between">
          <div className="text-sm">
            <p>© {new Date().getFullYear()} - Sprobble.xyz</p>
            <p>
              All copyrighted content (i.e. album artwork) on sprobble.xyz are
              owned by their respective owners. Data is provided by Spotify AB.
              sprobble.xyz is in no way affiliated with Spotify AB.
            </p>
          </div>
          <div className="flex flex-row">
            <DarkToggle />
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
      </div>
    </footer>
  );
}
