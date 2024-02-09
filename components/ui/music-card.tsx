import { LucideDot } from "lucide-react";
import { Button } from "./button";

interface MusicCardProps {
  image: string;
  track: {
    name: string;
    href: string;
  };
  artists: {
    name: string;
    href: string;
  }[];
  album: string;
  played_at: Date;
}

export function MusicCard({
  image,
  track,
  artists,
  album,
  played_at,
}: MusicCardProps) {
  const date = new Date(played_at).toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="flex flex-col gap-4 rounded-3xl border p-2">
      <div className="flex flex-row gap-4 md:flex-col">
        <div className="aspect-square w-36 flex-none overflow-hidden rounded-2xl md:w-full">
          <img
            className="h-full w-full object-cover object-center"
            src={image}
            alt="Temp Image"
          />
        </div>
        <div className="w-full overflow-hidden">
          <h1 className="truncate text-xl font-bold">{track.name}</h1>
          <p className="truncate text-sm font-semibold">{album}</p>
          <p className="text-sm font-semibold">
            {artists.map((x) => (
              <a key={x.name} href={x.href}>
                {x.name}
              </a>
            ))}
          </p>
          <Button asChild className="p-0" variant="link">
            <a href={track.href} target="_blank">
              Listen On Spotify
            </a>
          </Button>
        </div>
      </div>
      <div className="w-full flex-row overflow-hidden rounded-full bg-slate-100 p-1 text-slate-800">
        <div className="flex flex-row items-center text-xs md:text-sm">
          <div className="flex flex-none flex-row flex-nowrap items-center gap-2">
            <div className="aspect-square h-6 w-6 flex-none overflow-hidden rounded-full md:h-8 md:w-8">
              <img
                className="h-full w-full object-cover object-center"
                src="https://plus.unsplash.com/premium_photo-1675881736199-7737a3e6b140?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Temp Image"
              />
            </div>
            <p className="text-nowrap font-semibold">Kenny Bass</p>
          </div>
          <LucideDot className="h-6 w-6 flex-none" />
          <p className="truncate text-nowrap font-semibold">{date}</p>
        </div>
      </div>
    </article>
  );
}
