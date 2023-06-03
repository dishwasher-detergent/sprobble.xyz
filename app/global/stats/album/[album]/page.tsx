"use client";

import { History } from "@/components/history";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Models, Query } from "appwrite";
import { useEffect, useState } from "react";
import { useAppwrite, useCollection } from "react-appwrite";

const databaseId = "645c032960cb9f95212b";
const collectionId = "album";

export default function ArtistStatsPage({
  params,
}: {
  params: { album: string };
}) {
  const { album } = params;
  const itemCount = 10;
  const query = [Query.limit(itemCount), Query.equal("$id", album)];

  const { databases } = useAppwrite();

  const [formattedPlays, setFormattedPlays] = useState<any>([]);
  const [queries, setQueries] = useState<any>(query);

  const { data: plays, isLoading } = useCollection(
    databaseId,
    collectionId,
    queries,
    {
      queryFn: async (): Promise<any> => {
        const response = await databases.listDocuments<any>(
          databaseId,
          collectionId,
          queries
        );

        return response as Models.DocumentList<Models.Document>;
      },
      keepPreviousData: true,
    }
  );

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
  };

  useEffect(() => {
    if (isLoading) return;
    // @ts-ignore
    setFormattedPlays(groupByDate(plays.documents[0].plays));
  }, [plays]);

  console.log(formattedPlays);

  return (
    <>
      <h3 className="font-bold">Album Stats</h3>
      {isLoading ? (
        <Skeleton className="h-10 w-[250px] max-w-full" />
      ) : (
        <h2 className="text-xl font-black md:text-3xl">
          {/* @ts-ignore */}
          {plays?.documents[0].name}
        </h2>
      )}
      <div className="grid w-full grid-cols-1 gap-4 py-6 md:grid-cols-3">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="h-6 text-sm font-medium tracking-tight">
              Total Plays From This Album
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <p className="text-4xl font-bold">
                {/* @ts-ignore */}
                {plays?.documents[0].plays.length}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <History
        title="Recent Plays"
        isLoading={isLoading}
        formattedPlays={formattedPlays}
      />
    </>
  );
}
