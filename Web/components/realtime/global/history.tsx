"use client";

import { MusicCard } from "@/components/ui/music-card";
import usePlays from "@/hooks/use-plays";
import { PlayMinified } from "@/interfaces/plays-minified.interface";
import { Query } from "appwrite";
import { LucideGhost } from "lucide-react";
import { useEffect, useState } from "react";

interface GlobalHistoryProps {
  initial: PlayMinified[];
}

export function GlobalHistory({ initial }: GlobalHistoryProps) {
  const [data, setData] = useState<PlayMinified[]>(initial);

  const { data: plays, loading: plays_loading } = usePlays([
    Query.orderDesc("played_at"),
    Query.limit(12),
  ]);

  useEffect(() => {
    if (plays) {
      setData(plays);
    }
  }, [plays]);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.map((x) => (
          <MusicCard
            key={x.$id}
            track={{
              id: x.track_id,
              name: x.track_name,
              href: x.track_href,
            }}
            image={x.album_image}
            album={{
              id: x.album_id,
              name: x.album_name,
            }}
            artists={JSON.parse(x.artist).map((y: any) => ({
              id: y.id,
              name: y.name,
              href: y.href,
            }))}
            played_at={x.played_at}
            user={{
              id: x?.user_id,
              name: x?.user_name,
              avatar: x?.user_avatar,
            }}
          />
        ))}
      </div>
      {data && data.length == 0 && (
        <div className="flex h-24 w-full flex-row items-center justify-center gap-4 rounded-3xl bg-secondary">
          <LucideGhost className="h-10 w-10 flex-none rounded-xl bg-primary-foreground p-2 text-primary" />
          <p>Looks like no one has listened to anything, yet!</p>
        </div>
      )}
    </>
  );
}
