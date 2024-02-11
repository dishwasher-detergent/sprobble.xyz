"use client";

import { MusicCardLoading } from "@/components/loading/music-card";
import { Header } from "@/components/ui/header";
import { MusicCard } from "@/components/ui/music-card";
import { StatCard } from "@/components/ui/stat-card";
import useSong from "@/hooks/use-song";
import { LucideGhost, LucideMusic3, LucidePartyPopper } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function SongPage() {
  const { song } = useParams<{ song: string }>();

  const { data, loading } = useSong(song);

  console.log(data);

  return (
    <>
      <Header
        title={data?.name}
        sub={data?.artist.map((x, index) => (
          <Link href={`/artists/${x.$id}`}>
            {index > 0 && ", "}
            {x.name}
          </Link>
        ))}
      />
      <section className="relative z-10 grid grid-cols-1 pb-4 md:grid-cols-2 xl:-mt-24 xl:grid-cols-3 xl:pb-12">
        <StatCard
          title="Total Plays"
          stat={data?.plays.length}
          icon={<LucideMusic3 className="h-12 w-12" />}
          loading={loading}
        />
      </section>
      <section className="pb-12">
        <div className="flex flex-row flex-nowrap gap-4 pb-4 md:items-center md:justify-center">
          <LucidePartyPopper className="text-primary bg-primary-foreground h-10 w-10 flex-none rounded-xl p-2" />
          <h3 className="text-secondary-foreground text-lg font-bold md:text-xl">
            See Who&apos;s Listening To{" "}
            <span className="text-primary">{data?.name}</span>
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {!loading
            ? data?.plays?.map((x) => (
                <MusicCard
                  key={x.$id}
                  track={{
                    id: data.$id,
                    name: data.name,
                    href: data.href,
                  }}
                  image={x.album.images[0]}
                  album={{
                    id: x.album.$id,
                    name: x.album.name,
                  }}
                  artists={x.artist.map((y: any) => ({
                    id: y.$id,
                    name: y.name,
                    href: y.href,
                  }))}
                  played_at={x.played_at}
                  user={{
                    id: x?.user?.$id,
                    name: x?.user?.name,
                    avatar: x?.user?.avatar,
                  }}
                />
              ))
            : [...Array(10)].map((x, index) => (
                <MusicCardLoading key={index} />
              ))}
        </div>
        {!loading && data?.plays && data.plays.length == 0 && (
          <div className="bg-secondary flex h-24 w-full flex-row items-center justify-center gap-4 rounded-3xl">
            <LucideGhost className="text-primary bg-primary-foreground h-10 w-10 flex-none rounded-xl p-2" />
            <p>Looks like no one has listened to anything!</p>
          </div>
        )}
      </section>
    </>
  );
}
