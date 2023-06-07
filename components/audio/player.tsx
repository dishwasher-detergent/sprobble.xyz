"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AudioContext, AudioContextType } from "@/context/audioWrapper";
import { formatTimeForAudioPlayer } from "@/lib/utils";
import { LucidePauseCircle, LucidePlayCircle } from "lucide-react";
import { useContext } from "react";
import { Badge } from "../ui/badge";

export function AudioPlayer() {
  const {
    file: song,
    time,
    playing,
    toggle,
  } = useContext<AudioContextType>(AudioContext);

  if (!song) return null;

  return (
    <div className="flex h-20 w-full items-center gap-2 border-t p-2 shadow-sm">
      <div>
        <Avatar className="relative h-16 w-16 rounded-lg">
          <AvatarImage src={song?.artwork} />
        </Avatar>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-row">
          <div className="flex-1">
            <p className="flex items-center gap-2 font-bold">
              {song?.title} <Badge variant="outline">Preview</Badge>
            </p>
            <p className="text-sm text-slate-400">{song?.artist}</p>
          </div>
          <Button
            className="grid aspect-square h-8 place-items-center rounded-full p-0"
            onClick={toggle}
          >
            {playing ? (
              <LucidePauseCircle size={28} />
            ) : (
              <LucidePlayCircle size={28} />
            )}
          </Button>
        </div>
        <div className="flex w-full flex-row items-center gap-2">
          <p className="text-sm font-semibold text-slate-600">
            {formatTimeForAudioPlayer(time)}
          </p>
          <Progress
            className="h-2 bg-slate-300"
            value={Math.floor((time / song?.duration) * 100)}
          />
          <p className="text-sm font-semibold text-slate-600">
            {formatTimeForAudioPlayer(song?.duration)}
          </p>
        </div>
      </div>
    </div>
  );
}
