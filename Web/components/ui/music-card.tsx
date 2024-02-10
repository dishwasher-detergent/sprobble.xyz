import { AVATARS_BUCKET_ID, ENDPOINT, PROJECT_ID } from "@/lib/constants";
import { LucideCalendar, LucideDot } from "lucide-react";
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
  user?: {
    name: string;
    avatar: string;
  };
}

export function MusicCard({
  image,
  track,
  artists,
  album,
  played_at,
  user,
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
            {artists.map((x, index) => (
              <a key={index} href={x.href}>
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
      <div className="bg-secondary text-secondary-foreground w-full flex-row overflow-hidden rounded-full p-1">
        <div className="flex flex-row items-center text-xs md:text-sm">
          <div className="flex flex-none flex-row flex-nowrap items-center gap-2">
            {user && user?.avatar && (
              <div className="aspect-square h-6 w-6 flex-none overflow-hidden rounded-full md:h-8 md:w-8">
                <img
                  className="h-full w-full object-cover object-center"
                  src={`${ENDPOINT}/storage/buckets/${AVATARS_BUCKET_ID}/files/${user?.avatar}/view?project=${PROJECT_ID}`}
                  alt="Temp Image"
                />
              </div>
            )}
            {user && user?.name && (
              <p className="text-nowrap font-semibold">{user?.name}</p>
            )}
          </div>
          {user && (user?.avatar || user?.name) ? (
            <LucideDot className="h-6 w-6 flex-none" />
          ) : (
            <LucideCalendar className="h-6 w-6 flex-none px-1" />
          )}
          <p className="truncate text-nowrap font-semibold">{date}</p>
        </div>
      </div>
    </article>
  );
}
