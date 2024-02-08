import { Stat } from "@/types/Types";
import { clsx, type ClassValue } from "clsx";
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

export function groupByDate(data: any) {
  if (!data) return;

  return data.reduce((acc: any, val: any) => {
    const date = new Date(val.played_at)
      .toLocaleString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      })
      .match(/\d{2}\/\d{2}\/\d{4}/g)
      ?.toString();

    if (!date) return;

    const item = acc.find((item: any) =>
      item.date.match(new RegExp(date, "g"))
    );

    if (!item) acc.push({ date: date, tracks: [val] });
    else item.tracks.push(val);

    return acc;
  }, []);
}

export function custom_sort(a: any, b: any) {
  return new Date(a.date).getTime() - new Date(b.date).getTime();
}

export function textColorBasedOnBackground(color: string) {
  const lightness = color.match(/\d+/g)?.[2];
  if (Number(lightness) > 50) return "hsl(0,0%,0%)";
  else return "hsl(0,0%,100%)";
}

export function getHSL(color: string, alpha: number = 1) {
  const hue = color.match(/\d+/g)?.[0];
  const saturation = color.match(/\d+/g)?.[1];
  const lightness = color.match(/\d+/g)?.[2];
  // return the hsl string with the lightness increased by 10%
  return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
}

export function combineAndSumPlays(arr: Stat[] | undefined): Stat[] {
  if (!arr) return [];

  const combinedData: Stat[] = [];

  arr.forEach((item) => {
    const existingItem = combinedData.find(
      (i) => i.week_of_year === item.week_of_year
    );

    if (existingItem) {
      existingItem.number_of_plays += item.number_of_plays;
      existingItem.time_spent_listening = (
        Number(existingItem.time_spent_listening) +
        Number(item.time_spent_listening)
      ).toString();
    } else {
      combinedData.push({ ...item });
    }
  });

  return combinedData;
}
