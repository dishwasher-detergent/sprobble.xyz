"use client";

import StatsCard from "@/components/stats/card";
import { databaseId, totalStatsCollectionId } from "@/lib/appwrite";
import { TotalStats } from "@/types/Types";
import { LucideDisc2 } from "lucide-react";
import { useDocument } from "react-appwrite";

export default function ArtistCount() {
  const { data: artists, isLoading: artistLoading } = useDocument<TotalStats>(
    databaseId,
    totalStatsCollectionId,
    "artist"
  );
  return (
    <StatsCard
      title="Total Unique Artists"
      icon={<LucideDisc2 size={16} />}
      loading={artistLoading}
    >
      {artists?.count.toLocaleString()}
    </StatsCard>
  );
}
