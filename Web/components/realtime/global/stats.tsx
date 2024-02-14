"use client";

import { StatCard } from "@/components/ui/stat-card";
import useTotalStats from "@/hooks/use-total-stats";
import { TotalStat } from "@/interfaces/total-stats.interface";
import {
  ALBUM_COLLECTION_ID,
  ARTIST_COLLECTION_ID,
  TRACK_COLLECTION_ID,
} from "@/lib/constants";
import { LucideDisc3, LucideMusic3, LucidePersonStanding } from "lucide-react";
import { useEffect, useState } from "react";

interface GlobalStatsProps {
  initial: TotalStat[];
}

export function GlobalStats({ initial }: GlobalStatsProps) {
  const [data, setData] = useState<TotalStat[]>(initial);

  const { data: total_stats, loading: total_stats_loading } = useTotalStats();

  useEffect(() => {
    if (total_stats) {
      setData(total_stats);
    }
  }, [total_stats]);

  return (
    <>
      <StatCard
        title="Unique Songs"
        stat={data?.filter((x) => x.title === TRACK_COLLECTION_ID)[0].count}
        icon={<LucideMusic3 className="h-12 w-12" />}
      />
      <StatCard
        title="Unique Albums"
        stat={data?.filter((x) => x.title === ALBUM_COLLECTION_ID)[0].count}
        icon={<LucideDisc3 className="h-12 w-12" />}
      />
      <StatCard
        title="Unique Artists"
        stat={data?.filter((x) => x.title === ARTIST_COLLECTION_ID)[0].count}
        icon={<LucidePersonStanding className="h-12 w-12" />}
      />
    </>
  );
}
