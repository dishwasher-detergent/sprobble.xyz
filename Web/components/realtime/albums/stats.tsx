"use client";

import { StatCard } from "@/components/ui/stat-card";
import useAlbum from "@/hooks/use-album";
import { Album } from "@/interfaces/album.interface";
import { LucideAudioLines, LucideMusic3 } from "lucide-react";
import { useEffect, useState } from "react";

interface AlbumStatsProps {
  initial: Album;
  id: string;
}

export function AlbumStats({ initial, id }: AlbumStatsProps) {
  const [data, setData] = useState<Album>(initial);

  const { data: album } = useAlbum(id);

  useEffect(() => {
    if (album) {
      setData(album);
    }
  }, [album]);

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
    </>
  );
}
