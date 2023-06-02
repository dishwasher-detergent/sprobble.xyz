import { Audio } from "@/components/audio";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Artist, Play } from "@/types/Types";

interface HistoryItemProps {
  track: Play;
}

export default function HistoryItem({ track }: HistoryItemProps) {
  return (
    <article>
      <div className="relative flex flex-row items-start gap-2 rounded-lg p-1">
        {track.album?.images && (
          <Avatar className="relative h-24 w-24 rounded-lg">
            <AvatarImage src={track.album.images[0]} />
            <Audio
              file={{
                song: track.preview,
                title: track.name,
                artist: track.artist[0].name,
                artwork: track.album.images[0],
                duration: track.duration,
              }}
            />
          </Avatar>
        )}
        <div className="flex flex-col">
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
          <p className="font-bold">{track.track.name}</p>
          <a
            href={`/global/stats/album/${track.album.$id.replace(/\s/g, "")}`}
            className="text-sm text-slate-400 hover:text-blue-500"
          >
            {track.album.name}
          </a>
          {track.artist && (
            <p className="text-sm text-slate-400">
              {track.artist.map((item: Artist, index: number) => (
                <a
                  key={item.$id}
                  href={`/global/stats/artist/${item.$id.replace(/\s/g, "")}`}
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
      {track.user_id && (
        <a
          href={`/${track.user_id}/history`}
          className="text-sm text-slate-400"
        >
          Listened by&nbsp;
          <span className="inline-flex flex-row items-center text-blue-500">
            @{track.user_id}
          </span>
        </a>
      )}
    </article>
  );
}
