"use client";

import { Query } from "appwrite";
import { LucideDisc2 } from "lucide-react";
import { useCollection } from "react-appwrite";
import StatsCard from "../stats/card";

const databaseId = "645c032960cb9f95212b";

export default function ArtistCount() {
  const { data: artists, isLoading: artistLoading } = useCollection(
    databaseId,
    "artist",
    [Query.limit(1)]
  );
  return (
    <StatsCard
      title="Total Unique Artists"
      icon={<LucideDisc2 size={16} />}
      loading={artistLoading}
    >
      {artists?.total.toLocaleString()}
    </StatsCard>
  );
}
