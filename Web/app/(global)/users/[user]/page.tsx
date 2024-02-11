"use client";

import { MusicCardLoading } from "@/components/loading/music-card";
import { Header } from "@/components/ui/header";
import { MusicCard } from "@/components/ui/music-card";
import { Skeleton } from "@/components/ui/skeleton";
import { StatCard } from "@/components/ui/stat-card";
import { StatCardContainer } from "@/components/ui/stat-card-container";
import usePlays from "@/hooks/use-plays";
import useUser from "@/hooks/use-user";
import { Query } from "appwrite";
import { LucideAudioLines, LucideGhost, LucideMusic3 } from "lucide-react";
import { useParams } from "next/navigation";

export default function UserPage() {
  const { user } = useParams<{ user: string }>();

  const { data, loading } = useUser(user);
  const { data: plays, loading: plays_loading } = usePlays([
    Query.equal("user_id", user),
  ]);

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
        sub="Sprobble"
      />
      <StatCardContainer>
        <StatCard
          title="Total Plays"
          stat={plays?.length}
          icon={<LucideMusic3 className="h-12 w-12" />}
          loading={loading}
        />
      </StatCardContainer>
      <section className="pb-12">
        <div className="flex flex-row flex-nowrap gap-4 pb-4 md:items-center md:justify-center">
          <LucideAudioLines className="h-10 w-10 flex-none rounded-xl bg-primary-foreground p-2 text-primary" />
          <h3 className="text-lg font-bold text-secondary-foreground md:text-xl">
            See Who&apos;s Listening To{" "}
            <span className="text-primary">{data?.name}</span>
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {!plays_loading
            ? plays?.map((x) => (
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
              ))
            : [...Array(10)].map((x, index) => (
                <MusicCardLoading key={index} />
              ))}
        </div>
        {!loading && data?.plays && data.plays.length == 0 && (
          <div className="flex h-24 w-full flex-row items-center justify-center gap-4 rounded-3xl bg-secondary">
            <LucideGhost className="h-10 w-10 flex-none rounded-xl bg-primary-foreground p-2 text-primary" />
            <p>Looks like no one has listened to anything!</p>
          </div>
        )}
      </section>
    </>
  );
}
