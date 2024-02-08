"use client";

import {
  AudioContext,
  AudioContextType,
  SongType,
} from "@/context/audioWrapper";
import { LucidePause, LucidePlay } from "lucide-react";
import { useContext, useEffect, useState } from "react";

export function Audio({ file }: { file: SongType }) {
  const {
    file: song,
    toggle,
    setSong,
  } = useContext<AudioContextType>(AudioContext);
  const [firstPlay, setFirstPlay] = useState<boolean>(true);
  const [clientPlaying, togglePlaying] = useState(true);

  const toggleSong = () => {
    if (firstPlay || file.song != song?.song) {
      setSong(file);
      setFirstPlay(false);
    } else {
      toggle();
    }

    togglePlaying(!clientPlaying);
  };

  useEffect(() => {
    file.song != song?.song && togglePlaying(false);
  }, [song]);

  return (
    <button
      aria-label="Play song preview"
      className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center bg-slate-900/40 text-white opacity-0 transition-opacity hover:opacity-100"
      onClick={() => toggleSong()}
    >
      {clientPlaying ? <LucidePause size={24} /> : <LucidePlay size={24} />}
    </button>
  );
}
