import { ArtistHistory } from "@/components/realtime/artists/history";
import { ArtistStats } from "@/components/realtime/artists/stats";
import { WeekToWeek } from "@/components/realtime/week-to-week";
import { Header } from "@/components/ui/header";
import { SpotifyLink } from "@/components/ui/spotify-link";
import { Artist } from "@/interfaces/artist.interface";
import { ARTIST_COLLECTION_ID, DOMAIN } from "@/lib/constants";
import { rest_service } from "@/lib/rest";
import { combineAndSumPlays } from "@/lib/utils";
import { LucideAudioLines } from "lucide-react";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { artist: string };
}): Promise<Metadata> {
  const { artist: id } = params;
  const artist = await rest_service.get<Artist>(ARTIST_COLLECTION_ID, id);

  return {
    metadataBase: new URL(DOMAIN),
    title: `Sprobble - ${artist.name}`,
    description: `${artist.name}'s Sprobble Statistics.`,
    openGraph: {
      title: `Sprobble - ${artist.name}`,
      description: `${artist.name}'s Sprobble Statistics.`,
      url: DOMAIN,
      siteName: "sprobble.xyz",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Sprobble - ${artist.name}`,
      description: `${artist.name}'s Sprobble Statistics.`,
    },
  };
}

export default async function ArtistPage({
  params,
}: {
  params: { artist: string };
}) {
  const { artist: id } = params;
  const artist = await rest_service.get<Artist>(ARTIST_COLLECTION_ID, id);

  if (artist.code) {
    redirect("/");
  }

  const weekToWeekFormatted = combineAndSumPlays(artist.stats).map((stat) => ({
    name: `Week ${stat.week_of_year}`,
    plays: stat.number_of_plays,
    duration: (Number(stat.time_spent_listening) / 1000 / 60 / 60).toFixed(2),
  }));

  return (
    <>
      <Header
        title={artist?.name}
        sub="Artist"
        altSub={<SpotifyLink type="artist" id={id} />}
      />
      <section className="relative z-10 mt-4 mb-8 xl:-mt-48 p-2 bg-slate-900/10 dark:bg-slate-100/10 rounded-3xl">
        <div className="grid grid-cols-1 gap-4 pb-4 md:grid-cols-3">
          <div className="h-56 md:col-span-2 md:h-96">
            <WeekToWeek initial={weekToWeekFormatted} id={id} />
          </div>
          <div className="flex w-full flex-col gap-4">
            <ArtistStats initial={artist} id={id} />
          </div>
        </div>
      </section>
      <section className="pb-8">
        <div className="flex flex-row flex-nowrap gap-4 pb-4 md:items-center md:justify-center">
          <LucideAudioLines className="h-10 w-10 flex-none rounded-xl bg-primary-foreground p-2 text-primary dark:bg-primary dark:text-primary-foreground" />
          <h3 className="text-lg font-bold text-secondary-foreground md:text-xl">
            See Who&apos;s Listening To{" "}
            <span className="text-primary dark:text-primary-foreground">
              {artist?.name}
            </span>
          </h3>
        </div>
        <ArtistHistory initial={artist} id={id} />
      </section>
    </>
  );
}
