import Link from "next/link";

export function Logo() {
  return (
    <Link href={"/"}>
      <h1 className="flex flex-row items-center justify-center gap-2 text-xl font-black uppercase text-blue-600">
        Sprobble
      </h1>
    </Link>
  );
}
