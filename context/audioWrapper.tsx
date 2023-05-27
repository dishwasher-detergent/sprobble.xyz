"use client";

import React, { createContext, useEffect, useRef, useState } from "react";

export type AudioContextType = {
  playing: boolean;
  time: number;
  file: string;
  toggle: () => void;
  setSong: (newFile: string) => void;
};

/* @ts-ignore */
const AudioContext = createContext<AudioContextType>();

interface ProviderProps {
  children: React.ReactNode;
}

const AudioProvider = ({ children }: ProviderProps) => {
  const [file, setFile] = useState<string>("");

  const audio = useRef<HTMLAudioElement | undefined>(
    (typeof Audio !== "undefined") != undefined ? new Audio() : undefined
  );
  const [playing, setPlaying] = useState<boolean>(false);
  const [time, setCurrentTime] = useState<number>(0);

  const toggle = () => setPlaying(!playing);

  const setSong = (newFile: string) => {
    if (audio.current) {
      audio.current.src = newFile;
      audio.current?.play();
      setFile(newFile);
      setPlaying(true);
    }
  };

  const timeUpdate = (event: any) => {
    const trackInMs = event.target.currentTime * 1000;
    setCurrentTime(trackInMs);
  };

  useEffect(() => {
    playing ? audio.current?.play() : audio.current?.pause();

    if (audio.current) {
      audio.current.ontimeupdate = (e: any) => {
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

  return (
    <AudioContext.Provider value={{ playing, toggle, time, setSong, file }}>
      {children}
    </AudioContext.Provider>
  );
};

export { AudioProvider, AudioContext };
