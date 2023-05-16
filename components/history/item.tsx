import { Track } from "@/types/Types";
import Image from "next/image";
import Popularity from "../Song/popularity";

interface HistoryItemProps {
  track: Track[];
  played_at: string;
}

export default function HistoryItem({ track, played_at }: HistoryItemProps) {
  return (
    <a
      href={track[0].href}
      target="_blank"
      className="relative flex flex-row items-center gap-2 rounded-lg p-1 hover:bg-slate-100 hover:text-blue-600"
    >
      <Popularity
        className="absolute -top-1 -left-1 z-10"
        popularity={track[0].popularity}
      />
      <div className="relative w-16 h-16 rounded-lg overflow-hidden">
        <Image
          src={track[0].album[0].images[0]}
          alt={track[0].album[0].name}
          fill
          sizes="4rem"
        />
      </div>
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
    </a>
  );
}
