"use client";

import StatsCard from "@/components/stats/card";
import { TOTAL_STATS_COLLECTION_ID } from "@/lib/constants";
import { TotalStats } from "@/types/Types";
import { LucideDisc2 } from "lucide-react";
import { useDocument } from "react-appwrite";

const DATABASE_ID = "645c032960cb9f95212b";

export default function AlbumCount() {
  const { data: albums, isLoading: albumLoading } = useDocument<TotalStats>(
    DATABASE_ID,
    TOTAL_STATS_COLLECTION_ID,
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
