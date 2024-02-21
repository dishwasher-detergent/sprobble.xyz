import { Button } from "@/components/ui/button";
import { LucideGithub } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-primary px-4 py-12 text-white">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex w-full flex-row items-center">
          <Link className="text-3xl font-bold" href="/">
            Sprobble.xyz
          </Link>
          <div className="flex flex-1 items-center justify-end">
            <Button asChild variant="ghost" size="icon">
              <a href="" target="_blank">
                <span className="sr-only">Github</span>
                <LucideGithub className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
        <div className="flex w-full flex-row gap-8">
          <ul>
            <li>
              <p className="pb-2 text-lg font-bold">Pages</p>
            </li>
            <li>
              <Link className="text-sm" href="/songs">
                Songs
              </Link>
            </li>
            <li>
              <Link className="text-sm" href="/songs">
                Albums
              </Link>
            </li>
            <li>
              <Link className="text-sm" href="/songs">
                Artists
              </Link>
            </li>
            <li>
              <Link className="text-sm" href="/songs">
                Users
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <p className="pb-2 text-lg font-bold">Legal</p>
            </li>
            <li>
              <Link className="text-sm" href="/legal/privacy">
                Privacy
              </Link>
            </li>
          </ul>
        </div>
        <p className="text-sm">
          All copyrighted content (i.e. album artwork) on sprobble.xyz are owned
          by their respective owners. Data is provided by Spotify AB.
          sprobble.xyz is in no way affiliated with Spotify AB.
        </p>
      </div>
    </footer>
  );
}
