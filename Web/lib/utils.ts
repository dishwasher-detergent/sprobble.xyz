import { Stat } from "@/interfaces/stats.interface";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function combineAndSumPlays(arr: Stat[]): Stat[] {
  if (!arr) return [];

  const combinedData: Stat[] = [];

  arr.forEach((item) => {
    const existingItem = combinedData.find(
      (i) => i.week_of_year === item.week_of_year,
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
