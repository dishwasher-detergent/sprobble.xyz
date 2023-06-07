import { Audio } from "@/components/audio";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Artist, Play } from "@/types/Types";
import Image from "next/image";
import { Badge } from "../ui/badge";

interface HistoryItemProps {
  track: Play;
}

export default function HistoryItem({ track }: HistoryItemProps) {
  return (
    <article className="w-full max-w-md">
      <div className="relative flex flex-row items-start gap-2 rounded-lg p-1">
        {track.album?.images && (
          <Avatar className="relative h-16 w-16 rounded-lg md:h-24 md:w-24">
            <AvatarImage src={track.album.images[2]} />
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
        <div className="flex flex-1 flex-col">
          <p className="text-sm text-slate-400">
            {new Date(track.played_at).toLocaleDateString("en-us", {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </p>
          <p className="flex items-center gap-2 font-bold">
            {track.track.name}
            <Badge
              variant="outline"
              className="border-destructive px-1.5 py-0 text-destructive"
            >
              Explicit
            </Badge>
          </p>
          <a
            href={`/global/stats/album/${track.album.$id}`}
            className="text-sm text-slate-400 hover:text-blue-500"
          >
            {track.album.name}
          </a>
          {track.artist && (
            <p className="text-sm text-slate-400">
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
        <div>
          <a href={track.track.href} target="_blank">
            <Image
              src="/spotify/icon/Spotify_Icon_RGB_Black.png"
              alt="Spotify Icon Logo"
              width={21}
              height={21}
            />
          </a>
        </div>
      </div>
      {track.user_id && (
        <a href={`/user/${track.user_id}`} className="text-sm text-slate-400">
          Listened by&nbsp;
          <span className="inline-flex flex-row items-center text-blue-500">
            @{track.user_id}
          </span>
        </a>
      )}
    </article>
  );
}
