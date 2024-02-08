"use client";

import StatsCard from "@/components/stats/card";
import CustomTooltip from "@/components/stats/tooltips";
import { databaseId, statsCollectionId } from "@/lib/appwrite";
import { combineAndSumPlays } from "@/lib/utils";
import { Stat } from "@/types/Types";
import { Query } from "appwrite";
import { LucideTrendingUp } from "lucide-react";
import { useTheme } from "next-themes";
import { useCollection } from "react-appwrite";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";

export default function UserStats({ user }: { user?: string }) {
  const { theme, setTheme } = useTheme();

  const { data: stats, isLoading: statsLoading } = useCollection<Stat>(
    databaseId,
    statsCollectionId,
    [
      Query.orderAsc("week_of_year"),
      ...(user ? [Query.equal("user_id", user)] : []),
    ]
  );

  const year_to_date = combineAndSumPlays(stats?.documents as Stat[]).map(
    (stat: Stat) => ({
      name: `Week ${stat.week_of_year}`,
      plays: stat.number_of_plays,
      duration: (Number(stat.time_spent_listening) / 1000 / 60 / 60).toFixed(2),
    })
  );

  return (
    <div className="z-10 flex flex-col gap-4">
      <StatsCard
        title="Year To Date Sprobbles"
        icon={<LucideTrendingUp size={16} />}
      >
        {year_to_date
          ?.reduce((a: any, b: any) => a + b.plays, 0)
          .toLocaleString() + " Sprobbles"}
        <br />
        {year_to_date
          ?.reduce((a: any, b: any) => a + Number(b.duration), 0)
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
              unit={"Sprobbles"}
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
    </div>
  );
}
