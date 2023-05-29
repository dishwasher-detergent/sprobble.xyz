import { Audio } from "@/components/audio";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Track } from "@/types/Types";

interface HistoryItemProps {
  track: Track[];
  played_at: string;
  user_id?: string;
}

export default function HistoryItem({
  track,
  played_at,
  user_id,
}: HistoryItemProps) {
  return (
    <article>
      <div className="relative flex flex-row items-start gap-2 rounded-lg p-1">
        <Avatar className="relative h-16 w-16 rounded-lg">
          <AvatarImage src={track[0].album[0].images[0]} />
          <Audio
            file={{
              song: track[0].preview,
              title: track[0].name,
              artist: track[0].artist[0].name,
              artwork: track[0].album[0].images[0],
              duration: track[0].duration,
            }}
          />
        </Avatar>
        <div className="flex flex-col">
          <p className="text-sm text-slate-400">
            {new Date(played_at).toLocaleDateString("en-us", {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </p>
          <p className="font-bold">{track[0].name}</p>
          {track[0].artist[0] && (
            <p className="text-sm text-slate-400">{track[0].artist[0].name}</p>
          )}
        </div>
      </div>
      {user_id && (
        <a href={`/${user_id}/history`} className="text-sm text-slate-400">
          Listened by&nbsp;
          <span className="inline-flex flex-row items-center text-blue-500">
            @{user_id}
          </span>
        </a>
      )}
    </article>
  );
}
