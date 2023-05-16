import { LucideDisc2 } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/"}>
      <h1 className="font-black text-xl flex flex-row items-center gap-2 uppercase">
        <LucideDisc2 size={24} className="text-blue-600" />
        Sprobble
      </h1>
    </Link>
  );
}
