"use client";

import { Query } from "appwrite";
import { LucideDisc2 } from "lucide-react";
import { useCollection } from "react-appwrite";
import StatsCard from "../stats/card";

const databaseId = "645c032960cb9f95212b";

export default function AlbumCount() {
  const { data: albums, isLoading: albumLoading } = useCollection(
    databaseId,
    "album",
    [Query.limit(1)]
  );
  return (
    <StatsCard
      title="Total Unique Albums"
      icon={<LucideDisc2 size={16} />}
      loading={albumLoading}
    >
      {albums?.total.toLocaleString()}
    </StatsCard>
  );
}
