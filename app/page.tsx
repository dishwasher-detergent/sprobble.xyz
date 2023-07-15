"use client";

import { History } from "@/components/history";
import StatsCard from "@/components/stats/card";
import { Query } from "appwrite";
import { eachWeekOfInterval, getISOWeek } from "date-fns";
import {
  LucideCassetteTape,
  LucideClock5,
  LucideDisc2,
  LucidePersonStanding,
  LucideTrendingUp,
} from "lucide-react";
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
    "track",
    [Query.limit(1)]
  );
  const { data: albums, isLoading: albumLoading } = useCollection(
    databaseId,
    "album",
    [Query.limit(1)]
  );
  const { data: artists, isLoading: artistLoading } = useCollection(
    databaseId,
    "artist",
    [Query.limit(1)]
  );
  const { data: users, isLoading: userLoading } = useCollection(
    databaseId,
    "user",
    [Query.limit(1)]
  );
  const { data: stats, isLoading: statsLoading } = useCollection(
    databaseId,
    "stats"
  );

  const current_week_stats = stats?.documents.filter(
    (x) => x.week_of_year == getISOWeek(new Date())
  );

  const current_week_duration = current_week_stats
    ? (
        Number(
          current_week_stats.reduce(
            (a, b) => a + Number(b.time_spent_listening),
            0
          )
        ) /
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
      <section className="flex flex-col gap-10 pb-10">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-black md:text-3xl">Users Stats</h2>
          <div className="flex w-full flex-row flex-nowrap gap-4 overflow-x-auto">
            <StatsCard
              value={users?.total.toLocaleString()}
              loading={userLoading}
            >
              <>
                <span>Total Users</span>
                <LucideTrendingUp size={16} />
              </>
            </StatsCard>
            <StatsCard
              value={current_week_stats
                ?.reduce((a, b) => a + Number(b.number_of_plays), 0)
                ?.toLocaleString()}
              loading={statsLoading}
            >
              <>
                <span>Week To Date</span>
                <LucideTrendingUp size={16} />
              </>
            </StatsCard>
            <StatsCard
              value={year_plays?.toLocaleString()}
              loading={statsLoading}
            >
              <>
                <span>Year To Date Scrobbles</span>
                <LucideTrendingUp size={16} />
              </>
            </StatsCard>
          </div>
          <div className="flex w-full flex-row flex-nowrap gap-4 overflow-x-auto">
            <StatsCard
              value={`${current_week_duration} hours`}
              loading={statsLoading}
            >
              <>
                <span>Week To Date Time spent listening</span>
                <LucideClock5 size={16} />
              </>
            </StatsCard>
            <StatsCard
              value={`${current_month_duration} hours`}
              loading={statsLoading}
            >
              <>
                <span>Month To Date Time spent listening</span>
                <LucideClock5 size={16} />
              </>
            </StatsCard>
            <StatsCard value={`${year_duration} hours`} loading={statsLoading}>
              <>
                <span>Year To Date Time spent listening</span>
                <LucideClock5 size={16} />
              </>
            </StatsCard>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-black md:text-3xl">Music Stats</h2>
          <div className="flex w-full flex-row flex-nowrap gap-4 overflow-x-auto">
            <StatsCard
              value={artists?.total.toLocaleString()}
              loading={artistLoading}
            >
              <>
                <span>Total Unique Artists</span>
                <LucidePersonStanding size={16} />
              </>
            </StatsCard>
            <StatsCard
              value={albums?.total.toLocaleString()}
              loading={albumLoading}
            >
              <>
                <span>Total Unique Albums</span>
                <LucideDisc2 size={16} />
              </>
            </StatsCard>
            <StatsCard
              value={tracks?.total.toLocaleString()}
              loading={trackLoading}
            >
              <>
                <span>Total Unique Tracks</span>
                <LucideCassetteTape size={16} />
              </>
            </StatsCard>
          </div>
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
