"use client";

import { Audio } from "@/components/audio";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import UserTag from "@/components/user/tag";
import { lightenHSL, textColorBasedOnBackground } from "@/lib/utils";
import { Artist, Play } from "@/types/Types";
import { useColor } from "color-thief-react";
import Image from "next/image";

const ColorThief = require("colorthief");

interface HistoryItemProps {
  track: Play;
}

export default function HistoryItem({ track }: HistoryItemProps) {
  const { data, loading, error } = useColor(
    track.album.images[0],
    "hslString",
    {
      crossOrigin: "Anonymous",
    }
  );

  return (
    <Card
      className="w-full rounded-lg border-none p-2"
      style={{
        backgroundColor: data && lightenHSL(data, 30),
        color: data && textColorBasedOnBackground(lightenHSL(data, 30)),
      }}
    >
      <div className="relative flex flex-row items-start gap-2 rounded-lg p-1">
        {track.album?.images && (
          <Avatar className="relative h-16 w-16 rounded-lg md:h-28 md:w-28">
            <AvatarImage src={track.album.images[1]} />
            <Audio
              file={{
                song: track.track.preview,
                title: track.track.name,
                artist: track.artist[0].name,
                artwork: track.album.images[0],
                duration: track.track.duration,
              }}
            />
          </Avatar>
        )}
        <div className="flex flex-1 flex-col overflow-hidden">
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
          <div className="flex flex-row gap-2">
            <p className="truncate text-xl font-bold">{track.track.name}</p>
            {track.track.explicit && (
              <Badge
                variant="outline"
                className="flex-none border-destructive px-1.5 py-0 text-destructive"
              >
                Explicit
              </Badge>
            )}
          </div>
          <a
            href={`/global/stats/album/${track.album.$id}`}
            className="text-sm  hover:text-blue-500"
          >
            {track.album.name}
          </a>
          {track.artist && (
            <p className="text-sm ">
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
        </div>
      </div>
      <div className="flex flex-col items-end gap-2 text-sm ">
        {track.user_id && (
          <a
            href={`/user/${track.user_id}`}
            className="flex flex-row items-center gap-2"
          >
            Listened By
            <UserTag userId={track.user_id} />
          </a>
        )}
        <a
          href={track.track.href}
          target="_blank"
          className="flex flex-row items-center gap-2"
        >
          Listen on Spotify
          <div className="relative h-4 w-4 flex-none">
            <Image
              src="/spotify/icon/Spotify_Icon_RGB_Black.png"
              alt="Spotify Icon Logo"
              fill
            />
          </div>
        </a>
      </div>
    </Card>
  );
}
