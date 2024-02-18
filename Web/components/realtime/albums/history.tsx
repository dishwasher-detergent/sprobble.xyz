"use client";

import { HistoryContainer } from "@/components/ui/history-container";
import { MusicCard } from "@/components/ui/music-card";
import useAlbum from "@/hooks/use-album";
import { Album } from "@/interfaces/album.interface";
import { LucideGhost } from "lucide-react";
import { useEffect, useState } from "react";

interface AlbumHistoryProps {
  initial: Album;
  id: string;
}

export function AlbumHistory({ initial, id }: AlbumHistoryProps) {
  const [data, setData] = useState<Album>(initial);

  const { data: album } = useAlbum(id);

  useEffect(() => {
    if (album) {
      setData(album);
    }
  }, [album]);

  return (
    <>
      <HistoryContainer>
        {data?.plays?.map((x) => (
          <MusicCard
            key={x.$id}
            track={{
              id: x.track.$id,
              name: x.track.name,
              href: x.track.href,
            }}
            image={data.images[0]}
            album={{
              id: data.$id,
              name: data.name,
            }}
            artists={x.artist?.map((y: any) => ({
              id: y.$id,
              name: y.name,
            }))}
            played_at={x.played_at}
            user={{
              id: x?.user?.$id,
              name: x?.user?.name,
              avatar: x?.user?.avatar,
            }}
          />
        ))}
      </HistoryContainer>
      {data?.plays && data.plays.length == 0 && (
        <div className="flex h-24 w-full flex-row items-center justify-center gap-4 rounded-3xl bg-secondary">
          <LucideGhost className="h-10 w-10 flex-none rounded-xl bg-primary-foreground p-2 text-primary dark:bg-primary dark:text-primary-foreground" />
          <p>Looks like no one has listened to anything, yet!</p>
        </div>
      )}
    </>
  );
}
