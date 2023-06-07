"use client";

import React, { createContext, useEffect, useRef, useState } from "react";

export type SongType = {
  artist: string;
  title: string;
  artwork: string;
  song: string;
  duration: number;
};

export type AudioContextType = {
  playing: boolean;
  time: number;
  file: SongType | undefined;
  toggle: () => void;
  setSong: (song: SongType) => void;
};

/* @ts-ignore */
const AudioContext = createContext<AudioContextType>();

interface ProviderProps {
  children: React.ReactNode;
}

const AudioProvider = ({ children }: ProviderProps) => {
  const [file, setFile] = useState<SongType>();

  const audio = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== "undefined" ? new Audio() : undefined
  );
  const [playing, setPlaying] = useState<boolean>(false);
  const [time, setCurrentTime] = useState<number>(0);

  const toggle = () => setPlaying(!playing);

  const setSong = (song: SongType) => {
    if (audio.current) {
      audio.current.src = song.song;
      audio.current?.play();
      setFile(song);
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
