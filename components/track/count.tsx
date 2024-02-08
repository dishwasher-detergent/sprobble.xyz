"use client";

import StatsCard from "@/components/stats/card";
import { DATABASE_ID, TOTAL_STATS_COLLECTION_ID } from "@/lib/constants";
import { TotalStats } from "@/types/Types";
import { LucideDisc2 } from "lucide-react";
import { useDocument } from "react-appwrite";

export default function TrackCount() {
  const { data: tracks, isLoading: trackLoading } = useDocument<TotalStats>(
    DATABASE_ID,
    TOTAL_STATS_COLLECTION_ID,
    "track"
  );
  return (
    <StatsCard
      title="Total Unique Tracks"
      icon={<LucideDisc2 size={16} />}
      loading={trackLoading}
    >
      {tracks?.count.toLocaleString()}
    </StatsCard>
  );
}
