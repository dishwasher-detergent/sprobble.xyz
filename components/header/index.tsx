import Image from "next/image";

interface HeaderProps {
  artwork?: string;
  artwork_name?: string;
  title: string;
}

export function Header({ artwork, artwork_name, title }: HeaderProps) {
  return (
    <div className="relative flex md:h-64 flex-col md:flex-row overflow-hidden rounded-lg bg-slate-900 text-white shadow-sm">
      {artwork && artwork_name && (
        <div className="relative md:h-64 md:w-64 w-full aspect-square bg-slate-300">
          <Image src={artwork} fill alt={artwork_name} />
        </div>
      )}
      <div className="flex flex-col p-6 flex-1">
        <div className="flex-1">
          <h2 className="h-full text-3xl font-black md:text-8xl">{title}</h2>
        </div>
        <p className="w-full text-xs md:text-end">
          Stats are based on data collected by Sprobble.xyz
        </p>
      </div>
    </div>
  );
}
