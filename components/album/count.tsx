"use client";

import StatsCard from "@/components/stats/card";
import { totalStatsCollectionId } from "@/lib/appwrite";
import { TotalStats } from "@/types/Types";
import { LucideDisc2 } from "lucide-react";
import { useDocument } from "react-appwrite";

const databaseId = "645c032960cb9f95212b";

export default function AlbumCount() {
  const { data: albums, isLoading: albumLoading } = useDocument<TotalStats>(
    databaseId,
    totalStatsCollectionId,
    "album"
  );
  return (
    <StatsCard
      title="Total Unique Albums"
      icon={<LucideDisc2 size={16} />}
      loading={albumLoading}
    >
      {albums?.count.toLocaleString()}
    </StatsCard>
  );
}
