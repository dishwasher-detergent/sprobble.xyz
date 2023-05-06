"use client";

import { useState, useEffect } from "react";

export const useAudio = (url: string | undefined) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState<boolean>(false);
  const [time, setCurrentTime] = useState<number>(0);

  const toggle = () => setPlaying(!playing);

  const timeUpdate = (event: any) => {
    const trackInMs = event.target.currentTime * 1000;
    setCurrentTime(trackInMs);
  };

  useEffect(() => {
    playing ? audio.play() : audio.pause();
    audio.ontimeupdate = (e) => {
      timeUpdate(e);
    };
  }, [playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return { playing, toggle, time };
};
