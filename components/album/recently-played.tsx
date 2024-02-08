"use client";

import { History } from "@/components/history";
import { albumCollectionId, databaseId } from "@/lib/appwrite";
import { custom_sort } from "@/lib/utils";
import { Query } from "appwrite";
import { useState } from "react";
import { useCollection } from "react-appwrite";

export function AlbumRecentlyPlayed({ album }: { album: string }) {
  const itemCount = 10;
  const query = [Query.limit(itemCount), Query.equal("$id", album)];

  const [queries, setQueries] = useState<any>(query);

  const { data: plays, isLoading } = useCollection(
    databaseId,
    albumCollectionId,
    queries,
    {
      keepPreviousData: true,
    }
  );

  const groupByDate = (data: any) => {
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

  const formattedPlays = groupByDate(plays?.documents[0].plays);

  return (
    <History
      title="Recent Plays"
      isLoading={isLoading}
      formattedPlays={formattedPlays}
    />
  );
}
