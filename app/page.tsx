import { MusicCard } from "@/components/ui/music-card";
import { StatCard } from "@/components/ui/stat-card";
import { Play } from "@/interfaces/plays.interface";
import { TotalStat } from "@/interfaces/total-stats.interface";
import { database_service } from "@/lib/appwrite";
import {
  ALBUM_COLLECTION_ID,
  ARTIST_COLLECTION_ID,
  PLAYS_COLLECTION_ID,
  TOTAL_STATS_COLLECTION_ID,
  TRACK_COLLECTION_ID,
} from "@/lib/constants";
import { Query } from "appwrite";
import { LucideDisc3, LucideMusic3, LucidePersonStanding } from "lucide-react";

export default async function Home() {
  const music = await database_service.list<Play>(PLAYS_COLLECTION_ID, [
    Query.orderDesc("played_at"),
  ]);

  const stats = await database_service.list<TotalStat>(
    TOTAL_STATS_COLLECTION_ID,
  );

  return (
    <>
      <section className="pb-4">
        <h1 className="text-center text-4xl font-black">Track your Music</h1>
      </section>
      <section className="grid grid-cols-1 gap-4 pb-4 md:grid-cols-3">
        <div className="min-h-24 rounded-3xl border md:col-span-2"></div>
        <div className="flex w-full flex-col gap-4">
          <StatCard
            title="Unique Songs"
            stat={
              stats.documents.filter((x) => x.title === TRACK_COLLECTION_ID)[0]
                .count
            }
            icon={<LucideMusic3 className="h-12 w-12" />}
          />
          <StatCard
            title="Unique Albums"
            stat={
              stats.documents.filter((x) => x.title === ALBUM_COLLECTION_ID)[0]
                .count
            }
            icon={<LucideDisc3 className="h-12 w-12" />}
          />
          <StatCard
            title="Unique Artists"
            stat={
              stats.documents.filter((x) => x.title === ARTIST_COLLECTION_ID)[0]
                .count
            }
            icon={<LucidePersonStanding className="h-12 w-12" />}
          />
        </div>
      </section>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {music.documents.map((x) => (
          <MusicCard
            key={x.$id}
            track={{
              name: x.track.name,
              href: x.track.href,
            }}
            image={x.album.images[0]}
            album={x.album.name}
            artists={x.artist.map((y) => ({ name: y.name, href: y.href }))}
            played_at={x.played_at}
            user={{
              name: x?.user?.name,
              avatar: x?.user?.avatar,
            }}
          />
        ))}
      </section>
    </>
  );
}
