"use client";

import { History } from "@/components/history";
import StatsCard from "@/components/stats/card";
import CustomTooltip from "@/components/stats/tooltips";
import { groupByDate } from "@/lib/utils";
import { Stat } from "@/types/Types";
import { Query } from "appwrite";
import {
  LucideCassetteTape,
  LucideClock5,
  LucideDisc2,
  LucidePersonStanding,
  LucideTrendingUp,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useCollection } from "react-appwrite";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";

const databaseId = "645c032960cb9f95212b";
const collectionId = "plays";

export default function Home() {
  const itemCount = 10;
  const query = [Query.orderDesc("played_at"), Query.limit(itemCount)];

  const { theme, setTheme } = useTheme();
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
  const { data: stats, isLoading: statsLoading } = useCollection<Stat>(
    databaseId,
    "stats",
    [Query.orderAsc("week_of_year")]
  );

  const formattedPlays = groupByDate(plays?.documents);

  const year_to_date = stats?.documents.map((stat: Stat) => ({
    name: `Week ${stat.week_of_year}`,
    plays: stat.number_of_plays,
    duration: (Number(stat.time_spent_listening) / 1000 / 60 / 60).toFixed(2),
  }));

  return (
    <>
      <section className="flex flex-col gap-10 pb-10">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-black md:text-3xl">Users Stats</h2>
          <div className="flex w-full flex-row flex-nowrap gap-4 overflow-x-auto">
            <StatsCard
              title="Year To Date Scrobbles"
              icon={<LucideTrendingUp size={16} />}
              loading={statsLoading}
            >
              {year_to_date?.reduce((a, b) => a + b.plays, 0).toLocaleString()}
              <ResponsiveContainer width={"100%"} height={100}>
                <AreaChart data={year_to_date}>
                  <Tooltip content={<CustomTooltip />} />
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor={theme == "dark" ? "#dbeafe" : "#2563eb"}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor={theme == "dark" ? "#dbeafe" : "#2563eb"}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    unit={"Scrobbles"}
                    type="basis"
                    dataKey="plays"
                    stroke={theme == "dark" ? "#dbeafe" : "#2563eb"}
                    fill="url(#colorUv)"
                    strokeWidth={5}
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </StatsCard>
            <StatsCard
              title="Year To Date Time spent listening"
              icon={<LucideClock5 size={16} />}
              loading={statsLoading}
            >
              {year_to_date
                ?.reduce((a, b) => a + Number(b.duration), 0)
                .toLocaleString() + " Hours"}
              <ResponsiveContainer width={"100%"} height={100}>
                <AreaChart data={year_to_date}>
                  <Tooltip content={<CustomTooltip />} />
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor={theme == "dark" ? "#dbeafe" : "#2563eb"}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor={theme == "dark" ? "#dbeafe" : "#2563eb"}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    unit={"Hours"}
                    type="basis"
                    dataKey="duration"
                    stroke={theme == "dark" ? "#dbeafe" : "#2563eb"}
                    fill="url(#colorUv)"
                    strokeWidth={5}
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </StatsCard>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-black md:text-3xl">Music Stats</h2>
          <div className="flex w-full flex-row flex-nowrap gap-4 overflow-x-auto">
            <StatsCard
              title="Total Unique Artists"
              icon={<LucidePersonStanding size={16} />}
              loading={artistLoading}
            >
              {artists?.total.toLocaleString()}
            </StatsCard>
            <StatsCard
              title="Total Unique Albums"
              icon={<LucideDisc2 size={16} />}
              loading={albumLoading}
            >
              {albums?.total.toLocaleString()}
            </StatsCard>
            <StatsCard
              title="Total Unique Tracks"
              icon={<LucideCassetteTape size={16} />}
              loading={trackLoading}
            >
              {tracks?.total.toLocaleString()}
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
