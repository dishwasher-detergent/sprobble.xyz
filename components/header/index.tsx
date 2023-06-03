import Image from "next/image";

interface HeaderProps {
  artwork?: string;
  artwork_name?: string;
  title: string;
}

export function Header({ artwork, artwork_name, title }: HeaderProps) {
  return (
    <div className="relative flex h-64 flex-row overflow-hidden rounded-lg bg-slate-900 text-white shadow-sm">
      {artwork && artwork_name && (
        <div className="relative h-64 w-64 bg-slate-300">
          <div className="absolute right-0 z-20 h-full w-1/2 bg-gradient-to-l from-slate-900 to-transparent" />
          <div className="absolute inset-0 z-10 bg-slate-900/50" />
          <Image src={artwork} fill alt={artwork_name} />
        </div>
      )}
      <div className="absolute inset-0 z-30 flex flex-col p-6">
        <div className="flex-1">
          <h2 className="h-full text-5xl font-black md:text-8xl">{title}</h2>
        </div>
        <p className="w-full text-xs md:text-end">
          Stats are based on data collected by Sprobble.xyz
        </p>
      </div>
    </div>
  );
}
