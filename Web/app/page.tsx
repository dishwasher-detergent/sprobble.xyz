"use client";

import { MusicCard } from "@/components/ui/music-card";
import { StatCard } from "@/components/ui/stat-card";
import StatsGraph from "@/components/ui/stats-graph";
import { Play } from "@/interfaces/plays.interface";
import { Stat } from "@/interfaces/stats.interface";
import { TotalStat } from "@/interfaces/total-stats.interface";
import client, { database_service } from "@/lib/appwrite";
import {
  ALBUM_COLLECTION_ID,
  ARTIST_COLLECTION_ID,
  DATABASE_ID,
  PLAYS_COLLECTION_ID,
  STATS_COLLECTION_ID,
  TOTAL_STATS_COLLECTION_ID,
  TRACK_COLLECTION_ID,
} from "@/lib/constants";
import { combineAndSumPlays } from "@/lib/utils";
import { Query } from "appwrite";
import {
  LucideDisc3,
  LucideLineChart,
  LucideMusic3,
  LucidePartyPopper,
  LucidePersonStanding,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [plays, setPlays] = useState<Play[]>();
  const [total_stats, setTotalStats] = useState<TotalStat[]>();
  const [stats, setStats] = useState<any[]>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await database_service.list<Play>(PLAYS_COLLECTION_ID, [
        Query.orderDesc("played_at"),
      ]);

      setPlays(response.documents);
    };

    fetchData();

    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.${STATS_COLLECTION_ID}.documents`,
      () => {
        fetchData();
      },
    );

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await database_service.list<TotalStat>(
        TOTAL_STATS_COLLECTION_ID,
      );

      setTotalStats(response.documents);
    };

    fetchData();

    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.${TOTAL_STATS_COLLECTION_ID}.documents`,
      () => {
        fetchData();
      },
    );

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await database_service.list<Stat>(STATS_COLLECTION_ID, [
        Query.orderAsc("week_of_year"),
        Query.equal("user_id", "global"),
        Query.select([
          "number_of_plays",
          "user_id",
          "time_spent_listening",
          "week_of_year",
        ]),
      ]);

      const year_to_date = combineAndSumPlays(response.documents).map(
        (stat) => ({
          name: `Week ${stat.week_of_year}`,
          plays: stat.number_of_plays,
          duration: (
            Number(stat.time_spent_listening) /
            1000 /
            60 /
            60
          ).toFixed(2),
        }),
      );

      setStats(year_to_date);
    };

    fetchData();

    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.${STATS_COLLECTION_ID}.documents`,
      () => {
        fetchData();
      },
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <section className="relative mb-12 rounded-3xl px-4 pb-36 pt-24 xl:pb-64">
        <p className="text-primary relative z-10 text-center text-xl font-bold md:text-3xl">
          Sprobble
        </p>
        <h1 className="flex flex-col text-center text-6xl font-black mix-blend-multiply md:text-7xl lg:text-8xl">
          The Best <br className="md:hidden" />
          Place To
          <br />
          Track Your Music
        </h1>
        <div className="aurora absolute inset-0 rounded-3xl opacity-30 xl:-ml-[5%] xl:w-[110%]" />
      </section>
      <section className="relative z-10 pb-12 xl:-mt-48">
        <div className="flex flex-row flex-nowrap gap-4 pb-4 md:items-center md:justify-center">
          <LucideLineChart className="text-primary bg-primary-foreground h-10 w-10 flex-none rounded-xl p-2" />
          <h3 className="text-secondary-foreground text-lg font-bold md:text-xl">
            Check Out Our Global Stats
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-4 pb-4 md:grid-cols-3">
          <div className="bg-background min-h-24 rounded-3xl border p-2 md:col-span-2">
            <StatsGraph stats={stats} />
          </div>
          <div className="flex w-full flex-col gap-4">
            <StatCard
              title="Unique Songs"
              stat={
                total_stats?.filter((x) => x.title === TRACK_COLLECTION_ID)[0]
                  .count
              }
              icon={<LucideMusic3 className="h-12 w-12" />}
            />
            <StatCard
              title="Unique Albums"
              stat={
                total_stats?.filter((x) => x.title === ALBUM_COLLECTION_ID)[0]
                  .count
              }
              icon={<LucideDisc3 className="h-12 w-12" />}
            />
            <StatCard
              title="Unique Artists"
              stat={
                total_stats?.filter((x) => x.title === ARTIST_COLLECTION_ID)[0]
                  .count
              }
              icon={<LucidePersonStanding className="h-12 w-12" />}
            />
          </div>
        </div>
      </section>
      <section className="pb-12">
        <div className="flex flex-row flex-nowrap gap-4 pb-4 md:items-center md:justify-center">
          <LucidePartyPopper className="text-primary bg-primary-foreground h-10 w-10 flex-none rounded-xl p-2" />
          <h3 className="text-secondary-foreground text-lg font-bold md:text-xl">
            Lets&apos; See What Everyone Else Is Listening To
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {plays?.map((x) => (
            <MusicCard
              key={x.$id}
              track={{
                name: x.track.name,
                href: x.track.href,
              }}
              image={x.album.images[0]}
              album={x.album.name}
              artists={x.artist.map((y) => ({ name: y.name, href: y.href }))}
              played_at={x.played_at}
              user={{
                name: x?.user?.name,
                avatar: x?.user?.avatar,
              }}
            />
          ))}
        </div>
      </section>
    </>
  );
}
