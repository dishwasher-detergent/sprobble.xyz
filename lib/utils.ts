import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimeForAudioPlayer(time: number) {
  time = time / 1000;
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time - minutes * 60);
  const currentTime =
    str_pad_left(minutes, "0", 1) + ":" + str_pad_left(seconds, "0", 2);
  return currentTime;
}
function str_pad_left(string: number, pad: string, length: number) {
  return (new Array(length + 1).join(pad) + string).slice(-length);
}
