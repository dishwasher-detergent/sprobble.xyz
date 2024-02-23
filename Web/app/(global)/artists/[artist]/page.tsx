import { ArtistHistory } from "@/components/realtime/artists/history";
import { ArtistStats } from "@/components/realtime/artists/stats";
import { WeekToWeek } from "@/components/realtime/week-to-week";
import { Header } from "@/components/ui/header";
import { SpotifyLink } from "@/components/ui/spotify-link";
import { StatsContainer } from "@/components/ui/stats-container";
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
        className="pb-28 pt-16 md:pt-32"
        title={artist?.name}
        sub="Artist"
        altSub={<SpotifyLink type="artist" id={id} />}
      />
      <StatsContainer
        weekToWeek={<WeekToWeek initial={weekToWeekFormatted} id={id} />}
        stats={<ArtistStats initial={artist} id={id} />}
      />
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
