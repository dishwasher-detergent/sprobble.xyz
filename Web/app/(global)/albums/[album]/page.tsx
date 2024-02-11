"use client";

import { MusicCardLoading } from "@/components/loading/music-card";
import { Header } from "@/components/ui/header";
import { MusicCard } from "@/components/ui/music-card";
import { Skeleton } from "@/components/ui/skeleton";
import { SpotifyLink } from "@/components/ui/spotify-link";
import { StatCard } from "@/components/ui/stat-card";
import { StatCardContainer } from "@/components/ui/stat-card-container";
import useAlbum from "@/hooks/use-album";
import { LucideAudioLines, LucideGhost, LucideMusic3 } from "lucide-react";
import { useParams } from "next/navigation";

export default function AlbumPage() {
  const { album } = useParams<{ album: string }>();

  const { data, loading } = useAlbum(album);

  return (
    <>
      <Header
        className="mb-4 xl:mb-12 xl:pb-36"
        title={
          !loading ? (
            data?.name
          ) : (
            <Skeleton className="md:h-18 lg:h-22 relative z-10 mt-2 h-16 w-52" />
          )
        }
        sub="Album"
        altSub={<SpotifyLink type="album" id={album} />}
      />
      <StatCardContainer>
        <StatCard
          title="Total Plays"
          stat={data?.plays.length}
          icon={<LucideAudioLines className="h-12 w-12" />}
          loading={loading}
        />
        <StatCard
          title="Total Unique Songs"
          stat={data?.track.length}
          icon={<LucideMusic3 className="h-12 w-12" />}
          loading={loading}
        />
      </StatCardContainer>
      <section className="pb-12">
        <div className="flex flex-row flex-nowrap gap-4 pb-4 md:items-center md:justify-center">
          <LucideAudioLines className="text-primary bg-primary-foreground h-10 w-10 flex-none rounded-xl p-2" />
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
                    id: x.track.$id,
                    name: x.track.name,
                    href: x.track.href,
                  }}
                  image={data.images[0]}
                  album={{
                    id: data.$id,
                    name: data.name,
                  }}
                  artists={x.artist.map((y: any) => ({
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
