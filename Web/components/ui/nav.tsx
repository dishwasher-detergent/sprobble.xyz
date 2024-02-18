import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/ui/login-button";
import { ModeToggle } from "@/components/ui/theme-toggle";
import Link from "next/link";

export function Nav() {
  return (
    <header className="w-full border-b">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-2 px-4 py-2 md:flex-row md:justify-start">
        <Link
          className="text-xl font-bold text-primary dark:text-primary-foreground md:text-base"
          href="/"
        >
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
        <ModeToggle />
      </div>
    </header>
  );
}
