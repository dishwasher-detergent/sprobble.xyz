"use client";

import CustomTooltip from "@/components/ui/graph-tooltip";
import { LucideMusic3, LucideTimer } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";

export default function StatsGraph({ stats }: any) {
  return (
    <div className="z-10 flex h-full min-h-24 w-full flex-col gap-4 rounded-3xl border bg-background p-2">
      <div className="space-y-2 text-xl font-bold">
        <p className="flex flex-row items-center gap-2">
          <LucideMusic3 className="h-10 w-10 rounded-xl bg-primary-foreground p-2 text-primary dark:bg-slate-800 dark:text-primary-foreground" />
          {stats?.reduce((a: any, b: any) => a + b.plays, 0).toLocaleString() +
            " Sprobbles"}
        </p>
        <p className="flex flex-row items-center gap-2">
          <LucideTimer className="h-10 w-10 rounded-xl bg-primary-foreground p-2 text-primary dark:bg-slate-800 dark:text-primary-foreground" />
          {stats
            ?.reduce((a: any, b: any) => a + Number(b.duration), 0)
            .toLocaleString() + " Hours"}
        </p>
      </div>
      <div className="w-full flex-1">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <AreaChart data={stats}>
            <Tooltip content={<CustomTooltip />} />
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={"#7c3aed"} stopOpacity={0.8} />
                <stop offset="95%" stopColor={"#7c3aed"} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              unit={"Sprobbles"}
              type="basis"
              dataKey="plays"
              stroke={"#7c3aed"}
              fill="url(#colorUv)"
              strokeWidth={5}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
