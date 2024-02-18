import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AVATARS_BUCKET_ID, ENDPOINT, PROJECT_ID } from "@/lib/constants";
import { LucideCalendar, LucideDot } from "lucide-react";
import Link from "next/link";
import { Button } from "./button";
import { Spotify } from "./spotify";

interface MusicCardProps {
  image: string;
  track: {
    id: string;
    name: string;
    href: string;
  };
  artists: {
    id: string;
    name: string;
  }[];
  album: {
    id: string;
    name: string;
  };
  played_at: Date;
  user?: {
    id: string;
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
  const shortDate = new Date(played_at).toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const fullDate = new Date(played_at).toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  return (
    <article className="flex flex-col gap-4 rounded-3xl border p-2">
      <div className="flex flex-1 flex-row gap-4 md:flex-col">
        <div className="aspect-square w-36 flex-none overflow-hidden rounded-2xl md:w-full">
          <img
            className="h-full w-full object-cover object-center"
            src={image}
            alt="Temp Image"
          />
        </div>
        <div className="w-full overflow-hidden">
          <Link href={`/songs/${track.id}`} className="hover:text-primary">
            <h1 className="truncate text-xl font-bold">{track.name}</h1>
          </Link>
          <Link href={`/albums/${album.id}`} className="hover:text-primary">
            <p className="truncate text-sm font-semibold">{album.name}</p>
          </Link>
          <div className="text-sm font-semibold">
            {artists.map((x, index) => (
              <Link
                key={index}
                href={`/artists/${x.id}`}
                className="hover:text-primary"
              >
                {index != 0 && ", "}
                {x.name}
              </Link>
            ))}
          </div>
          <Button
            asChild
            className="p-0 font-bold text-[#1ed760]"
            variant="link"
            size="lg"
          >
            <a
              href={track.href}
              target="_blank"
              className="flex flex-row items-center gap-1"
            >
              <Spotify />
              Play On Spotify
            </a>
          </Button>
        </div>
      </div>
      <div className="w-full flex-row overflow-hidden rounded-full bg-secondary p-1 text-secondary-foreground">
        <div className="flex flex-row items-center text-sm">
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
              <Link
                href={`/users/${user.id}`}
                className="text-nowrap font-semibold hover:text-primary"
              >
                {user?.name}
              </Link>
            )}
          </div>
          {user && (user?.avatar || user?.name) ? (
            <LucideDot className="h-6 w-6 flex-none" />
          ) : (
            <LucideCalendar className="h-6 w-6 flex-none px-1" />
          )}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="truncate text-nowrap font-semibold">
                  {shortDate}
                </p>
              </TooltipTrigger>
              <TooltipContent>
                <p>{fullDate}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </article>
  );
}
