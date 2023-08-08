"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AudioContext, AudioContextType } from "@/context/audioWrapper";
import { formatTimeForAudioPlayer } from "@/lib/utils";
import { LucideX } from "lucide-react";
import { useContext } from "react";

export function AudioPlayer() {
  const {
    file: song,
    time,
    setSong,
  } = useContext<AudioContextType>(AudioContext);

  if (!song) return null;

  return (
    <div className="flex w-full items-center gap-6 bg-blue-500 px-2 py-1 text-white backdrop-blur-md">
      <p className="flex flex-nowrap items-center gap-4 text-sm">
        <Badge variant="outline" className="text-white">
          Preview
        </Badge>
        {song?.title}{" "}
      </p>
      <div className="flex flex-1 items-center gap-4">
        <p className="text-xs font-semibold text-white">
          {formatTimeForAudioPlayer(time)}
        </p>
        <Progress
          className="h-2 bg-white"
          value={Math.floor((time / song?.duration) * 100)}
        />
        <p className="text-xs font-semibold text-white">
          {formatTimeForAudioPlayer(song?.duration)}
        </p>
      </div>
      <Button variant="ghost" size="icon" onClick={() => setSong(null)}>
        <LucideX size={16} />
      </Button>
    </div>
  );
}
