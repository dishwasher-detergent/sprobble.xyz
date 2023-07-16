"use client";

import { useEffect, useRef, useState } from "react";

export const useAudio = (url: string | undefined) => {
  const audio = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== "undefined" ? new Audio(url) : undefined
  );
  const [playing, setPlaying] = useState<boolean>(false);
  const [time, setCurrentTime] = useState<number>(0);

  const toggle = () => setPlaying(!playing);

  const timeUpdate = (event: any) => {
    const trackInMs = event.target.currentTime * 1000;
    setCurrentTime(trackInMs);
  };

  useEffect(() => {
    playing ? audio.current?.play() : audio.current?.pause();

    if (audio.current) {
      audio.current.ontimeupdate = (e) => {
        timeUpdate(e);
      };
    }
  }, [playing]);

  useEffect(() => {
    const aud = audio?.current;
    aud?.addEventListener("ended", () => setPlaying(false));
    return () => {
      aud?.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return { playing, toggle, time };
};
