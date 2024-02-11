"use client";

import { MusicCardLoading } from "@/components/loading/music-card";
import StatsGraphLoading from "@/components/loading/stats-graph";
import { Header } from "@/components/ui/header";
import { HeroLoginButton } from "@/components/ui/hero-login-button";
import { MusicCard } from "@/components/ui/music-card";
import { StatCard } from "@/components/ui/stat-card";
import StatsGraph from "@/components/ui/stats-graph";
import usePlays from "@/hooks/use-plays";
import useStats from "@/hooks/use-stats";
import useTotalStats from "@/hooks/use-total-stats";
import {
  ALBUM_COLLECTION_ID,
  ARTIST_COLLECTION_ID,
  TRACK_COLLECTION_ID,
} from "@/lib/constants";
import { Query } from "appwrite";
import {
  LucideDisc3,
  LucideGhost,
  LucideLineChart,
  LucideMusic3,
  LucidePartyPopper,
  LucidePersonStanding,
} from "lucide-react";

export default function Home() {
  const { data: plays, loading: plays_loading } = usePlays([
    Query.orderDesc("played_at"),
    Query.limit(12),
  ]);
  const { data: total_stats, loading: total_stats_loading } = useTotalStats();
  const { yearToDate, loading: stats_loading } = useStats([
    Query.orderAsc("week_of_year"),
    Query.equal("user_id", "global"),
    Query.select([
      "number_of_plays",
      "user_id",
      "time_spent_listening",
      "week_of_year",
    ]),
  ]);

  return (
    <>
      <Header
        title={
          <>
            The Best <br className="md:hidden" />
            Place To
            <br />
            Track Your Music
          </>
        }
        sub="Sprobble"
        altSub={<HeroLoginButton />}
      />
      <section className="relative z-10 pb-12 xl:-mt-48">
        <div className="flex flex-row flex-nowrap gap-4 pb-4 md:items-center md:justify-center">
          <LucideLineChart className="h-10 w-10 flex-none rounded-xl bg-primary-foreground p-2 text-primary" />
          <h3 className="text-lg font-bold text-secondary-foreground md:text-xl">
            Check Out Our Global Stats
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-4 pb-4 md:grid-cols-3">
          <div className="h-56 md:col-span-2 md:h-96">
            {/* <StatsGraph stats={stats} /> */}
            {!stats_loading ? (
              <StatsGraph stats={yearToDate} />
            ) : (
              <StatsGraphLoading />
            )}
          </div>
          <div className="flex w-full flex-col gap-4">
            <StatCard
              title="Unique Songs"
              stat={
                total_stats?.filter((x) => x.title === TRACK_COLLECTION_ID)[0]
                  .count
              }
              icon={<LucideMusic3 className="h-12 w-12" />}
              loading={total_stats_loading}
            />
            <StatCard
              title="Unique Albums"
              stat={
                total_stats?.filter((x) => x.title === ALBUM_COLLECTION_ID)[0]
                  .count
              }
              icon={<LucideDisc3 className="h-12 w-12" />}
              loading={total_stats_loading}
            />
            <StatCard
              title="Unique Artists"
              stat={
                total_stats?.filter((x) => x.title === ARTIST_COLLECTION_ID)[0]
                  .count
              }
              icon={<LucidePersonStanding className="h-12 w-12" />}
              loading={total_stats_loading}
            />
          </div>
        </div>
      </section>
      <section className="pb-12">
        <div className="flex flex-row flex-nowrap gap-4 pb-4 md:items-center md:justify-center">
          <LucidePartyPopper className="h-10 w-10 flex-none rounded-xl bg-primary-foreground p-2 text-primary" />
          <h3 className="text-lg font-bold text-secondary-foreground md:text-xl">
            Lets&apos; See What Everyone Else Is Listening To
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {!plays_loading
            ? plays?.map((x) => (
                <MusicCard
                  key={x.$id}
                  track={{
                    id: x.track_id,
                    name: x.track_name,
                    href: x.track_href,
                  }}
                  image={x.album_image}
                  album={{
                    id: x.album_id,
                    name: x.album_name,
                  }}
                  artists={JSON.parse(x.artist).map((y: any) => ({
                    id: y.id,
                    name: y.name,
                    href: y.href,
                  }))}
                  played_at={x.played_at}
                  user={{
                    id: x?.user_id,
                    name: x?.user_name,
                    avatar: x?.user_avatar,
                  }}
                />
              ))
            : [...Array(10)].map((x, index) => (
                <MusicCardLoading key={index} />
              ))}
        </div>
        {!plays_loading && plays && plays.length == 0 && (
          <div className="flex h-24 w-full flex-row items-center justify-center gap-4 rounded-3xl bg-secondary">
            <LucideGhost className="h-10 w-10 flex-none rounded-xl bg-primary-foreground p-2 text-primary" />
            <p>Looks like no one has listened to anything!</p>
          </div>
        )}
      </section>
    </>
  );
}
