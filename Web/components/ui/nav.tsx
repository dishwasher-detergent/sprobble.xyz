import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoginButton } from "./login-button";

export function Nav() {
  return (
    <header className="w-full border-b">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-2 px-4 py-2 md:flex-row md:justify-start">
        <Link className="text-xl font-bold text-primary md:text-base" href="/">
          Sprobble.xyz
        </Link>
        <nav className="flex-1">
          <ul className="flex flex-row">
            <li>
              <Button variant="ghost" asChild>
                <Link href="/songs">Songs</Link>
              </Button>
            </li>
            <li>
              <Button variant="ghost" asChild>
                <Link href="/albums">Albums</Link>
              </Button>
            </li>
            <li>
              <Button variant="ghost" asChild>
                <Link href="/artists">Artists</Link>
              </Button>
            </li>
            <li>
              <Button variant="ghost" asChild>
                <Link href="/users">Users</Link>
              </Button>
            </li>
          </ul>
        </nav>
        <LoginButton />
      </div>
    </header>
  );
}
