import { Stat } from "@/interfaces/stats.interface";
import { Query } from "appwrite";
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

export async function fetchAndSaveImage(
  url: string,
  filename: string,
): Promise<File> {
  const response = await fetch(url);
  const blob = await response.blob();
  const file = new File([blob], filename, { type: blob.type });
  return file;
}

export function generateQueryList(queries: Query[]) {
  const queryList: string[] = [];

  queries.forEach((x) => {
    queryList.push(`queries[]=${x}`);
  });

  return queryList.join("&");
}
