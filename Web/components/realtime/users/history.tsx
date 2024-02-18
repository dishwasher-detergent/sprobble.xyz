"use client";

import { HistoryContainer } from "@/components/ui/history-container";
import { MusicCard } from "@/components/ui/music-card";
import usePlays from "@/hooks/use-plays";
import { PlayMinified } from "@/interfaces/plays-minified.interface";
import { Query } from "appwrite";
import { LucideGhost } from "lucide-react";
import { useEffect, useState } from "react";

interface UserHistoryProps {
  initial: PlayMinified[];
  id: string;
}

export function UserHistory({ initial, id }: UserHistoryProps) {
  const [data, setData] = useState<PlayMinified[]>(initial);

  const { data: plays, loading: plays_loading } = usePlays([
    Query.equal("user_id", id),
    Query.orderDesc("played_at"),
  ]);

  useEffect(() => {
    if (plays) {
      setData(plays);
    }
  }, [plays]);

  return (
    <>
      <HistoryContainer>
        {data
          ?.sort(
            (a, b) =>
              new Date(b.played_at).getTime() - new Date(a.played_at).getTime(),
          )
          .map((x) => (
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
      </HistoryContainer>
      {data && data.length == 0 && (
        <div className="flex h-24 w-full flex-row items-center justify-center gap-4 rounded-3xl bg-secondary">
          <LucideGhost className="h-10 w-10 flex-none rounded-xl bg-primary-foreground p-2 text-primary" />
          <p>Looks they have not listened to anything, yet!</p>
        </div>
      )}
    </>
  );
}
