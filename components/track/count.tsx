"use client";

import StatsCard from "@/components/stats/card";
import { databaseId, totalStatsCollectionId } from "@/lib/appwrite";
import { TotalStats } from "@/types/Types";
import { LucideDisc2 } from "lucide-react";
import { useDocument } from "react-appwrite";

export default function TrackCount() {
  const { data: tracks, isLoading: trackLoading } = useDocument<TotalStats>(
    databaseId,
    totalStatsCollectionId,
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
