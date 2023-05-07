"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAudio } from "@/hooks/useAudio";
import { formatTimeForAudioPlayer } from "@/lib/utils";
import { LucidePause, LucidePlay } from "lucide-react";

interface AudioPlayerProps {
  track: {
    preview: string;
    duration: number | undefined;
  };
}

export default function AudioPlayer({ track }: AudioPlayerProps) {
  const { playing, toggle, time } = useAudio(track.preview);

  return (
    <div className="w-full h-12 rounded-lg bg-slate-100 flex items-center gap-2 p-4">
      <Button
        className="aspect-square p-2 rounded-full h-8 grid place-items-center"
        onClick={toggle}
      >
        {playing ? <LucidePlay size={16} /> : <LucidePause size={16} />}
      </Button>
      {track.duration && (
        <div className="w-full flex flex-row gap-2 items-center">
          <p className="text-sm font-semibold text-slate-600">
            {formatTimeForAudioPlayer(time)}
          </p>
          <Progress
            className="h-2 bg-slate-300"
            value={(time / track.duration) * 100}
          />
          <p className="text-sm font-semibold text-slate-600">
            {formatTimeForAudioPlayer(track.duration)}
          </p>
        </div>
      )}
    </div>
  );
}
