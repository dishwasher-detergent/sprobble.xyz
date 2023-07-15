import { cn } from "@/lib/utils";
import Link from "next/link";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href={"/"}>
      <h1
        className={cn("text-xl font-black uppercase text-blue-600", className)}
      >
        Sprobble
      </h1>
    </Link>
  );
}
