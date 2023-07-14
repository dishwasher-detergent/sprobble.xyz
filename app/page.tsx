"use client";

import { History } from "@/components/history";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Query } from "appwrite";
import { eachWeekOfInterval, getISOWeek } from "date-fns";
import { useEffect, useState } from "react";
import { useCollection } from "react-appwrite";

const databaseId = "645c032960cb9f95212b";
const collectionId = "plays";

export default function Home() {
  const itemCount = 10;
  const query = [Query.orderDesc("played_at"), Query.limit(itemCount)];

  const [formattedPlays, setFormattedPlays] = useState<any>([]);
  const [queries, setQueries] = useState<any>(query);

  const { data: plays, isLoading } = useCollection(
    databaseId,
    collectionId,
    queries,
    {
      keepPreviousData: true,
    }
  );

  const { data: tracks, isLoading: trackLoading } = useCollection(
    databaseId,
    "track"
  );
  const { data: albums, isLoading: albumLoading } = useCollection(
    databaseId,
    "album"
  );
  const { data: artists, isLoading: artistLoading } = useCollection(
    databaseId,
    "artist"
  );
  const { data: users, isLoading: userLoading } = useCollection(
    databaseId,
    "user"
  );
  const { data: stats, isLoading: statsLoading } = useCollection(
    databaseId,
    "stats"
  );

  const current_week_stats = stats?.documents.filter(
    (x) => x.week_of_year == getISOWeek(new Date())
  )[0];

  const current_week_duration = current_week_stats
    ? (
        Number(current_week_stats.time_spent_listening) /
        1000 /
        60 /
        60
      ).toFixed(2)
    : "";

  const year_plays = stats?.documents.reduce(
    (a, b) => a + b.number_of_plays,
    0
  );

  const year_duration = (
    Number(
      stats?.documents.reduce((a, b) => a + Number(b.time_spent_listening), 0)
    ) /
    1000 /
    60 /
    60
  ).toFixed(2);

  const weeksInMonth = eachWeekOfInterval({
    start: new Date(),
    end: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
  });

  const current_month_duration = (
    stats?.documents
      .filter(
        (x) =>
          x.week_of_year >= getISOWeek(weeksInMonth[0]) &&
          x.week_of_year <= getISOWeek(weeksInMonth[weeksInMonth.length - 1])
      )
      .reduce((a, b) => a + Number(b.time_spent_listening), 0) /
    1000 /
    60 /
    60
  ).toFixed(2);

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
    // @ts-ignore
    setFormattedPlays(groupByDate(plays.documents));
  }, [plays]);

  return (
    <>
      <section className="flex flex-col gap-4 py-4">
        <h2 className="text-xl font-black md:text-3xl">Users Stats</h2>
        <div className="flex w-full flex-row flex-nowrap gap-4 overflow-x-auto">
          <Card className="min-w-[20rem] flex-1">
            <CardHeader>
              <CardTitle className="h-6 text-sm font-medium tracking-tight">
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!userLoading ? (
                <p className="text-4xl font-bold">{users?.total}</p>
              ) : (
                <Skeleton className="h-10 w-full" />
              )}
            </CardContent>
          </Card>
          <Card className="min-w-[20rem] flex-1">
            <CardHeader>
              <CardTitle className="h-6 text-sm font-medium tracking-tight">
                Week To Date Scrobbles
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!statsLoading ? (
                <p className="text-4xl font-bold">
                  {current_week_stats.number_of_plays}
                </p>
              ) : (
                <Skeleton className="h-10 w-full" />
              )}
            </CardContent>
          </Card>
          <Card className="min-w-[20rem] flex-1">
            <CardHeader>
              <CardTitle className="h-6 text-sm font-medium tracking-tight">
                Year To Date Scrobbles
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!statsLoading ? (
                <p className="text-4xl font-bold">{year_plays}</p>
              ) : (
                <Skeleton className="h-10 w-full" />
              )}
            </CardContent>
          </Card>
        </div>
        <div className="flex w-full flex-row flex-nowrap gap-4 overflow-x-auto">
          <Card className="min-w-[20rem] flex-1">
            <CardHeader>
              <CardTitle className="h-6 text-sm font-medium tracking-tight">
                Week To Date Time spent listening
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!statsLoading ? (
                <p className="text-4xl font-bold">
                  {current_week_duration}&nbsp;hours
                </p>
              ) : (
                <Skeleton className="h-10 w-full" />
              )}
            </CardContent>
          </Card>
          <Card className="min-w-[20rem] flex-1">
            <CardHeader>
              <CardTitle className="h-6 text-sm font-medium tracking-tight">
                Month To Date Time spent listening
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!statsLoading ? (
                <p className="text-4xl font-bold">
                  {current_month_duration}&nbsp;hours
                </p>
              ) : (
                <Skeleton className="h-10 w-full" />
              )}
            </CardContent>
          </Card>
          <Card className="min-w-[20rem] flex-1">
            <CardHeader>
              <CardTitle className="h-6 text-sm font-medium tracking-tight">
                Year To Date Time spent listening
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!statsLoading ? (
                <p className="text-4xl font-bold">{year_duration}&nbsp;hours</p>
              ) : (
                <Skeleton className="h-10 w-full" />
              )}
            </CardContent>
          </Card>
        </div>
        <h2 className="text-xl font-black md:text-3xl">Music Stats</h2>
        <div className="flex w-full flex-row flex-nowrap gap-4 overflow-x-auto">
          <Card className="min-w-[20rem] flex-1">
            <CardHeader>
              <CardTitle className="h-6 text-sm font-medium tracking-tight">
                Total Unique Artists
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!artistLoading ? (
                <p className="text-4xl font-bold">{artists?.total}</p>
              ) : (
                <Skeleton className="h-10 w-full" />
              )}
            </CardContent>
          </Card>
          <Card className="min-w-[20rem] flex-1">
            <CardHeader>
              <CardTitle className="h-6 text-sm font-medium tracking-tight">
                Total Unique Albums
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!albumLoading ? (
                <p className="text-4xl font-bold">{albums?.total}</p>
              ) : (
                <Skeleton className="h-10 w-full" />
              )}
            </CardContent>
          </Card>
          <Card className="min-w-[20rem] flex-1">
            <CardHeader>
              <CardTitle className="h-6 text-sm font-medium tracking-tight">
                Total Unique Tracks
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!trackLoading ? (
                <p className="text-4xl font-bold">{tracks?.total}</p>
              ) : (
                <Skeleton className="h-10 w-full" />
              )}
            </CardContent>
          </Card>
        </div>
      </section>
      <History
        title="Recent Plays"
        isLoading={isLoading}
        formattedPlays={formattedPlays}
      />
    </>
  );
}
