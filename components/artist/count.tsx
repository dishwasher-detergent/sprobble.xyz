"use client";

import StatsCard from "@/components/stats/card";
import { client, database_service } from "@/lib/appwrite";
import { DATABASE_ID, TOTAL_STATS_COLLECTION_ID } from "@/lib/constants";
import { TotalStats } from "@/types/Types";
import { LucideDisc2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function ArtistCount() {
  const [stat, setStat] = useState<TotalStats>();
  const [loading, setLoading] = useState<boolean>(true);

  async function init() {
    setLoading(true);
    const response = await database_service.get<TotalStats>(
      TOTAL_STATS_COLLECTION_ID,
      "artist"
    );
    setStat(response);
    setLoading(false);
  }

  useEffect(() => {
    init();

    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.${TOTAL_STATS_COLLECTION_ID}.documents`,
      (response) => {
        console.log("test", response);
      }
    );

    return unsubscribe();
  }, []);

  return (
    <StatsCard
      title="Total Unique Artists"
      icon={<LucideDisc2 size={16} />}
      loading={loading}
    >
      {stat?.count.toLocaleString()}
    </StatsCard>
  );
}
