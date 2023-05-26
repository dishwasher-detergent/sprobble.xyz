import { LucideDisc2 } from "lucide-react";
import Link from "next/link";

export function Logo() {
  return (
    <Link href={"/"}>
      <h1 className="flex flex-row items-center gap-2 text-xl font-black uppercase">
        <LucideDisc2 size={24} className="text-blue-600" />
        Sprobble
      </h1>
    </Link>
  );
}
