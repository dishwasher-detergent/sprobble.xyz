"use client";

import { useAccount, useCollection } from "react-appwrite";
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

  const {
    data: plays,
    isLoading,
    refetch,
  } = useCollection<Play>(databaseId, collectionId, [
    Query.orderDesc("played_at"),
    Query.limit(50),
  ]);

  const groupByDate = (data: any) => {
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
  };

  useEffect(() => {
    if (isLoading) return;
    setFormattedPlays(groupByDate(plays));
  }, [plays]);

  return (
    <>
      <div>
        <h2 className="mb-6 text-3xl font-black">Recently Played</h2>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <ul className="flex flex-col gap-10">
          {formattedPlays.map((play: any) => (
            <div key={play.date}>
              <h3 className="flex items-center pb-4 text-base font-bold text-slate-400">
                <LucideCalendarClock size={16} className="mr-2" />
                {new Date(play.date).toLocaleDateString("en-us", {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </h3>
              <ul className="ml-1.5 flex flex-col gap-2 border-l pl-4">
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
