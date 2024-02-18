"use client";

import { StatCard } from "@/components/ui/stat-card";
import useArtist from "@/hooks/use-artist";
import { Artist } from "@/interfaces/artist.interface";
import { LucideAudioLines, LucideDisc3, LucideMusic3 } from "lucide-react";
import { useEffect, useState } from "react";

interface ArtistStatsProps {
  initial: Artist;
  id: string;
}

export function ArtistStats({ initial, id }: ArtistStatsProps) {
  const [data, setData] = useState<Artist>(initial);

  const { data: artist } = useArtist(id);

  useEffect(() => {
    if (artist) {
      setData(artist);
    }
  }, [artist]);

  return (
    <>
      <StatCard
        title="Total Plays"
        stat={data?.plays.length}
        icon={<LucideAudioLines className="h-12 w-12" />}
      />
      <StatCard
        title="Total Unique Songs"
        stat={data?.track.length}
        icon={<LucideMusic3 className="h-12 w-12" />}
      />
      <StatCard
        title="Total Unique Albums"
        stat={data?.album.length}
        icon={<LucideDisc3 className="h-12 w-12" />}
      />
    </>
  );
}
