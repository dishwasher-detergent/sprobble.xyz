import { Logo } from "@/components/logo";
import { NavMenu } from "@/components/nav/menu";
import { LoginWithSpotify } from "../login-with-spotify";

export function Nav() {
  return (
    <header className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-2 px-4">
      <Logo />
      <div className="flex">
        <LoginWithSpotify />
        <NavMenu />
      </div>
    </header>
  );
}
