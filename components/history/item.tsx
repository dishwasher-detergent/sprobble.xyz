"use client";

import { Audio } from "@/components/audio";
import { Card } from "@/components/ui/card";
import UserTag from "@/components/user/tag";
import { getHSL } from "@/lib/utils";
import { Artist, Play } from "@/types/Types";
import { useColor } from "color-thief-react";
import Image from "next/image";

interface HistoryItemProps {
  track: Play;
}

export default function HistoryItem({ track }: HistoryItemProps) {
  const { data } = useColor(track.album.images[0], "hslString", {
    crossOrigin: "Anonymous",
  });

  return (
    <Card
      className="w-full rounded-lg border-none p-2 text-slate-900 md:w-72"
      style={{
        background:
          data &&
          `radial-gradient(circle farthest-corner at top left, ${getHSL(
            data,
            0.6
          )} 0%, transparent 70%)`,
      }}
    >
      {track.album?.images && (
        <div className="relative aspect-square w-full overflow-hidden rounded-lg">
          <Image
            alt={track.album.name}
            src={track.album.images[1]}
            fill
            sizes="(max-width: 256px) 100vw"
            priority={true}
          />
          <Audio
            file={{
              song: track.track.preview,
              title: track.track.name,
              artist: track.artist[0].name,
              artwork: track.album.images[0],
              duration: track.track.duration,
            }}
          />
        </div>
      )}
      <div className="flex flex-1 flex-col overflow-hidden pb-6 pt-2">
        <div className="flex flex-row items-center gap-2">
          <p className="truncate text-xl font-bold">{track.track.name}</p>
          {track.track.explicit && (
            <div
              className="grid h-5 w-5 place-items-center rounded-md border border-destructive text-xs text-destructive"
              title="explicit"
            >
              E
            </div>
          )}
        </div>
        <a
          href={`/global/stats/album/${track.album.$id}`}
          className="truncate text-sm hover:text-blue-500"
        >
          {track.album.name}
        </a>
        {track.artist && (
          <p className="truncate text-sm">
            {track.artist.map((item: Artist, index: number) => (
              <a
                key={item.$id}
                href={`/global/stats/artist/${item.$id}`}
                className="hover:text-blue-500"
              >
                {item.name}
                {track.artist.length > 1 && index != track.artist.length - 1
                  ? ", "
                  : ""}
              </a>
            ))}
          </p>
        )}
        <a
          href={track.track.href}
          target="_blank"
          className="flex flex-row items-center gap-2 text-sm"
        >
          Listen on Spotify
          <span className="relative h-4 w-4 flex-none">
            <Image
              src="/spotify/icon/Spotify_Icon_RGB_Black.png"
              alt="Spotify Icon Logo"
              fill
              sizes="(max-width: 16px) 100vw"
            />
          </span>
        </a>
      </div>
      <div className="flex flex-col items-end text-sm">
        {track.user_id && <UserTag userId={track.user_id} />}
        <p className="text-sm">
          {new Date(track.played_at).toLocaleDateString("en-us", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </p>
      </div>
    </Card>
  );
}
