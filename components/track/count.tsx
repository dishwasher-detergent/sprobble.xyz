"use client";

import StatsCard from "@/components/stats/card";
import { databaseId, trackCollectionId } from "@/lib/appwrite";
import { Query } from "appwrite";
import { LucideDisc2 } from "lucide-react";
import { useCollection } from "react-appwrite";

export default function TrackCount() {
  const { data: tracks, isLoading: trackLoading } = useCollection(
    databaseId,
    trackCollectionId,
    [Query.limit(1)]
  );
  return (
    <StatsCard
      title="Total Unique Tracks"
      icon={<LucideDisc2 size={16} />}
      loading={trackLoading}
    >
      {tracks?.total.toLocaleString()}
    </StatsCard>
  );
}
