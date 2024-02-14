"use client";

import { MusicCard } from "@/components/ui/music-card";
import useArtist from "@/hooks/use-artist";
import { Artist } from "@/interfaces/artist.interface";
import { LucideGhost } from "lucide-react";
import { useEffect, useState } from "react";

interface ArtistHistoryProps {
  initial: Artist;
  id: string;
}

export function ArtistHistory({ initial, id }: ArtistHistoryProps) {
  const [data, setData] = useState<Artist>(initial);

  const { data: artist } = useArtist(id);

  useEffect(() => {
    if (artist) {
      setData(artist);
    }
  }, [artist]);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.plays?.map((x) => (
          <MusicCard
            key={x.$id}
            track={{
              id: x.track.$id,
              name: x.track.name,
              href: x.track.href,
            }}
            image={x.album.images[0]}
            album={{
              id: x.album.$id,
              name: x.album.name,
            }}
            artists={[
              {
                id: data.$id,
                name: data.name,
              },
            ]}
            played_at={x.played_at}
            user={{
              id: x?.user?.$id,
              name: x?.user?.name,
              avatar: x?.user?.avatar,
            }}
          />
        ))}
      </div>
      {data?.plays && data.plays.length == 0 && (
        <div className="flex h-24 w-full flex-row items-center justify-center gap-4 rounded-3xl bg-secondary">
          <LucideGhost className="h-10 w-10 flex-none rounded-xl bg-primary-foreground p-2 text-primary" />
          <p>Looks like no one has listened to anything, yet!</p>
        </div>
      )}
    </>
  );
}
