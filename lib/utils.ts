import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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

  const formatted = data.reduce((acc: any, val: any) => {
    const date = new Date(val.played_at)
      .toLocaleString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      })
      .match(/\d{2}\/\d{2}\/\d{4}/g)
      ?.toString();

    val["album"] = {
      // @ts-ignore
      name: plays.documents[0].name,
      // @ts-ignore
      $id: plays.documents[0].$id,
      // @ts-ignore
      images: plays.documents[0].images,
    };

    if (!date) return;

    const item = acc.find((item: any) =>
      item.date.match(new RegExp(date, "g"))
    );

    if (!item) acc.push({ date: date, tracks: [val] });
    else item.tracks.push(val);

    return acc;
  }, []);

  return formatted.sort(custom_sort).reverse();
};

export function custom_sort(a: any, b: any) {
  return new Date(a.date).getTime() - new Date(b.date).getTime();
}

export function textColorBasedOnBackground(color: string) {
  const lightness = color.match(/\d+/g)?.[2];
  if(Number(lightness) > 50) return "hsl(0,0%,0%)";
  else return "hsl(0,0%,100%)"
}

export function lightenHSL(color: string, lightenBy: number) {
  const hue = color.match(/\d+/g)?.[0];
  const saturation = color.match(/\d+/g)?.[1];
  const lightness = color.match(/\d+/g)?.[2];
  // return the hsl string with the lightness increased by 10%
  return `hsl(${hue}, ${saturation}%, ${Number(lightness) + lightenBy}%)`;
}