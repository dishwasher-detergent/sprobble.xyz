import { AlbumHistory } from "@/components/realtime/albums/history";
import { AlbumStats } from "@/components/realtime/albums/stats";
import { WeekToWeek } from "@/components/realtime/week-to-week";
import { Header } from "@/components/ui/header";
import { SpotifyLink } from "@/components/ui/spotify-link";
import { Album } from "@/interfaces/album.interface";
import { ALBUM_COLLECTION_ID, DOMAIN } from "@/lib/constants";
import { rest_service } from "@/lib/rest";
import { combineAndSumPlays } from "@/lib/utils";
import { LucideAudioLines } from "lucide-react";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { album: string };
}): Promise<Metadata> {
  const { album: id } = params;
  const album = await rest_service.get<Album>(ALBUM_COLLECTION_ID, id);

  return {
    metadataBase: new URL(DOMAIN),
    title: `Sprobble - ${album.name}`,
    description: `${album.name}'s Sprobble Statistics.`,
    openGraph: {
      title: `Sprobble - ${album.name}`,
      description: `${album.name}'s Sprobble Statistics.`,
      url: DOMAIN,
      siteName: "sprobble.xyz",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Sprobble - ${album.name}`,
      description: `${album.name}'s Sprobble Statistics.`,
    },
  };
}

export default async function AlbumPage({
  params,
}: {
  params: { album: string };
}) {
  const { album: id } = params;
  const album = await rest_service.get<Album>(ALBUM_COLLECTION_ID, id);

  if (album.code) {
    redirect("/");
  }

  const weekToWeekFormatted = combineAndSumPlays(album.stats).map((stat) => ({
    name: `Week ${stat.week_of_year}`,
    plays: stat.number_of_plays,
    duration: (Number(stat.time_spent_listening) / 1000 / 60 / 60).toFixed(2),
  }));

  return (
    <>
      <Header
        title={album?.name}
        sub="Album"
        altSub={<SpotifyLink type="album" id={id} />}
      />
      <section className="relative z-10 mt-4 p-2 mb-16 xl:-mt-24 bg-slate-400/10 dark:bg-slate-50/10 rounded-3xl">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="h-56 md:col-span-2 md:h-96">
            <WeekToWeek initial={weekToWeekFormatted} id={id} />
          </div>
          <div className="flex w-full flex-col gap-4">
            <AlbumStats initial={album} id={id} />
          </div>
        </div>
      </section>
      <section className="pb-8">
        <div className="flex flex-row flex-nowrap gap-4 pb-4 md:items-center md:justify-center">
          <LucideAudioLines className="h-10 w-10 flex-none rounded-xl bg-primary-foreground p-2 text-primary dark:bg-primary dark:text-primary-foreground" />
          <h3 className="text-lg font-bold text-secondary-foreground md:text-xl">
            See Who&apos;s Listening To{" "}
            <span className="text-primary dark:text-primary-foreground">
              {album?.name}
            </span>
          </h3>
        </div>
        <AlbumHistory initial={album} id={id} />
      </section>
    </>
  );
}

export const dynamic = 'force-dynamic'