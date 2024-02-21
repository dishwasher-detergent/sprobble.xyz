import { SongHistory } from "@/components/realtime/songs/history";
import { SongStats } from "@/components/realtime/songs/stats";
import { WeekToWeek } from "@/components/realtime/week-to-week";
import { Header } from "@/components/ui/header";
import { SpotifyLink } from "@/components/ui/spotify-link";
import { Track } from "@/interfaces/track.interface";
import { DOMAIN, TRACK_COLLECTION_ID } from "@/lib/constants";
import { rest_service } from "@/lib/rest";
import { combineAndSumPlays } from "@/lib/utils";
import { LucideAudioLines } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { song: string };
}): Promise<Metadata> {
  const { song: id } = params;
  const song = await rest_service.get<Track>(TRACK_COLLECTION_ID, id);

  return {
    metadataBase: new URL(DOMAIN),
    title: `Sprobble - ${song.name}`,
    description: `${song.name}'s Sprobble Statistics.`,
    openGraph: {
      title: `Sprobble - ${song.name}`,
      description: `${song.name}'s Sprobble Statistics.`,
      url: DOMAIN,
      siteName: "sprobble.xyz",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Sprobble - ${song.name}`,
      description: `${song.name}'s Sprobble Statistics.`,
    },
  };
}

export default async function SongPage({
  params,
}: {
  params: { song: string };
}) {
  const { song: id } = params;
  const song = await rest_service.get<Track>(TRACK_COLLECTION_ID, id);

  if (song.code) {
    redirect("/");
  }

  const weekToWeekFormatted = combineAndSumPlays(song.stats).map((stat) => ({
    name: `Week ${stat.week_of_year}`,
    plays: stat.number_of_plays,
    duration: (Number(stat.time_spent_listening) / 1000 / 60 / 60).toFixed(2),
  }));

  return (
    <>
      <Header
        title={song?.name}
        sub={song?.artist.map((x, index) => (
          <Link key={x.$id} href={`/artists/${x.$id}`}>
            {index > 0 && ", "}
            {x.name}
          </Link>
        ))}
        altSub={<SpotifyLink type="track" id={id} />}
      />
      <section className="relative z-10 mt-4 p-2 mb-8 xl:-mt-48 bg-slate-400/10 dark:bg-slate-50/10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="h-56 md:col-span-2 md:h-96">
            <WeekToWeek initial={weekToWeekFormatted} id={id} />
          </div>
          <div className="flex w-full flex-col gap-4">
            <SongStats initial={song} id={id} />
          </div>
        </div>
      </section>
      <section className="pb-8">
        <div className="flex flex-row flex-nowrap gap-4 pb-4 md:items-center md:justify-center">
          <LucideAudioLines className="h-10 w-10 flex-none rounded-xl bg-primary-foreground p-2 text-primary dark:bg-primary dark:text-primary-foreground" />
          <h3 className="text-lg font-bold text-secondary-foreground md:text-xl">
            See Who&apos;s Listening To{" "}
            <span className="text-primary dark:text-primary-foreground">
              {song?.name}
            </span>
          </h3>
        </div>
        <SongHistory initial={song} id={id} />
      </section>
    </>
  );
}
