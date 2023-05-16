"use client";

import { useCollection } from "react-appwrite";
import { Play, Track } from "@/types/Types";
import { useEffect, useState } from "react";
import HistoryItem from "@/components/history/item";
import { LucideCalendarClock } from "lucide-react";
import Loader from "@/components/Loader";
import { Query } from "appwrite";

export default function Home() {
  const [formattedPlays, setFormattedPlays] = useState<any>([]);

  const databaseId = "645c032960cb9f95212b";
  const collectionId = "plays";

  const { data: plays, isLoading } = useCollection<Play>(
    databaseId,
    collectionId,
    [
      Query.orderDesc("played_at"),
      Query.limit(50)
    ]
  );

  const groupByDate = (data: any) => {
    if (!data) return;

    return data.reduce((acc: any, val: any) => {
      let date = new Date(val.played_at).toLocaleString("en-US"); 
      date = date.match(/\d{2}\/\d{2}\/\d{4}/g).toString();
      const item = acc.find((item: any) =>
        item.date.match(new RegExp(date, "g"))
      );

      if (!item) acc.push({ date: val.played_at, tracks: [val] });
      else item.tracks.push(val);

      return acc;
    }, []);
  };

  useEffect(() => {
    if (isLoading) return;
    setFormattedPlays(groupByDate(plays));
  }, [plays]);

  return (
    <>
      <h2 className="font-black text-3xl sticky top-0 z-10 px-4 py-2 rounded-lg bg-white/60 backdrop-blur-md mb-4">
        Recently Played
      </h2>
      {isLoading ? (
        <Loader />
      ) : (
        <ul className="flex flex-col gap-10">
          {formattedPlays.map((play: any) => (
            <div key={play.date}>
              <h3 className="font-bold text-base text-slate-400 flex items-center pb-4">
                <LucideCalendarClock className="mr-2 w-4 h-4" />
                {new Date(play.date).toLocaleDateString("en-us", {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </h3>
              <ul className="flex flex-col gap-2 pl-4 border-l ml-1.5">
                {play.tracks.map((track: Play) => (
                  <li key={track.$id}>
                    <HistoryItem
                      played_at={track.played_at}
                      track={track.track}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </ul>
      )}
    </>
  );
}
