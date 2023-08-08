"use client";

import StatsCard from "@/components/stats/card";
import { artistCollectionId, databaseId } from "@/lib/appwrite";
import { Query } from "appwrite";
import { LucideDisc2 } from "lucide-react";
import { useCollection } from "react-appwrite";

export default function ArtistCount() {
  const { data: artists, isLoading: artistLoading } = useCollection(
    databaseId,
    artistCollectionId,
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
