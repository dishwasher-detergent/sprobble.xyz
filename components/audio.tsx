"use client";

import { AudioContext, AudioContextType } from "@/context/audioWrapper";
import { LucidePauseCircle, LucidePlayCircle } from "lucide-react";
import { useContext, useEffect, useState } from "react";

export function Audio({ file }: { file: string }) {
  const {
    file: song,
    toggle,
    setSong,
  } = useContext<AudioContextType>(AudioContext);
  const [clientPlaying, togglePlaying] = useState(false);

  const toggleSong = () => {
    if (song != file) {
      setSong(file);
    }

    if (clientPlaying) {
      toggle();
    }

    togglePlaying(!clientPlaying);
  };

  useEffect(() => {
    file != song && togglePlaying(false);
  }, [song]);

  return (
    <button
      className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center bg-slate-900/40 text-white opacity-0 transition-opacity hover:opacity-100"
      onClick={() => toggleSong()}
    >
      {clientPlaying ? <LucidePauseCircle /> : <LucidePlayCircle />}
    </button>
  );
}
