import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Nav() {
  return (
    <header className="w-full border-b">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-2 px-4 py-2 md:flex-row md:justify-start">
        <Link className="text-primary text-xl font-bold md:text-base" href="/">
          Sprobble.xyz
        </Link>
        <nav>
          <ul className="flex flex-row">
            <li>
              <Button variant="ghost">Songs</Button>
            </li>
            <li>
              <Button variant="ghost">Albums</Button>
            </li>
            <li>
              <Button variant="ghost">Artists</Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
