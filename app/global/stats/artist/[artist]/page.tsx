"use client";

import { History } from "@/components/history";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Query } from "appwrite";
import { useEffect, useState } from "react";
import { useAppwrite, useCollection } from "react-appwrite";

const databaseId = "645c032960cb9f95212b";
const collectionId = "artist";

export default function ArtistStatsPage({
  params,
}: {
  params: { artist: string };
}) {
  const { artist } = params;
  const itemCount = 10;
  const query = [Query.limit(itemCount), Query.equal("$id", artist)];

  const { databases } = useAppwrite();

  const [formattedPlays, setFormattedPlays] = useState<any>([]);
  const [queries, setQueries] = useState<any>(query);

  const { data: plays, isLoading } = useCollection(
    databaseId,
    collectionId,
    queries,
    {
      // @ts-ignore
      queryFn: async (): Promise<Models.DocumentList<Models.Document>> => {
        const response = await databases.listDocuments<any>(
          databaseId,
          collectionId,
          queries
        );

        return response;
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

      val["artist"] = [
        {
          // @ts-ignore
          name: plays.documents[0].name,
          // @ts-ignore
          $id: plays.documents[0].$id,
        },
      ];

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

  return (
    !isLoading && (
      <>
        <h3 className="font-bold">Artist Stats</h3>
        <h2 className="text-xl font-black md:text-3xl">
          {/* @ts-ignore */}
          {plays.documents[0].name}
        </h2>
        <div className="grid h-52 w-full grid-cols-1 gap-4 py-6 md:grid-cols-3">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="text-sm font-medium tracking-tight">
                Total Listens
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {/* @ts-ignore */}
                {plays.documents[0].plays.length}
              </p>
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="text-sm font-medium tracking-tight">
                Total Unique Tracks Listened To
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {/* @ts-ignore */}
                {plays.documents[0].track.length}
              </p>
            </CardContent>
          </Card>
        </div>

        <History
          title="Recent Plays"
          isLoading={isLoading}
          formattedPlays={formattedPlays}
        />
      </>
    )
  );
}
