"use client";

import { StatCard } from "@/components/ui/stat-card";
import { StatCardContainer } from "@/components/ui/stat-card-container";
import useSong from "@/hooks/use-song";
import { Track } from "@/interfaces/track.interface";
import { LucideMusic3 } from "lucide-react";
import { useEffect, useState } from "react";

interface SongStatsProps {
  initial: Track;
  id: string;
}

export function SongStats({ initial, id }: SongStatsProps) {
  const [data, setData] = useState<Track>(initial);

  const { data: song } = useSong(id);

  useEffect(() => {
    if (song) {
      setData(song);
    }
  }, [song]);

  return (
    <StatCardContainer>
      <StatCard
        title="Total Plays"
        stat={data?.plays.length}
        icon={<LucideMusic3 className="h-12 w-12" />}
      />
    </StatCardContainer>
  );
}
