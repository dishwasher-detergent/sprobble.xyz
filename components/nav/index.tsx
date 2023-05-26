import { MobileNav } from "@/components/nav/mobile";
import { Logo } from "@/components/logo";

export function Nav() {
  return (
    <header className="flex h-16 w-full items-center justify-between border-b px-4 shadow-sm md:hidden">
      <MobileNav />
      <Logo />
    </header>
  );
}
