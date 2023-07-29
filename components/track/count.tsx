"use client";

import { Query } from "appwrite";
import { LucideDisc2 } from "lucide-react";
import { useCollection } from "react-appwrite";
import StatsCard from "../stats/card";

const databaseId = "645c032960cb9f95212b";

export default function TrackCount() {
  const { data: tracks, isLoading: trackLoading } = useCollection(
    databaseId,
    "track",
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
