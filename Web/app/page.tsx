import { GlobalHistory } from "@/components/realtime/global/history";
import { GlobalStats } from "@/components/realtime/global/stats";
import { GlobalWeekToWeek } from "@/components/realtime/global/week-to-week";
import { Header } from "@/components/ui/header";
import { HeroLoginButton } from "@/components/ui/hero-login-button";
import { PlayMinified } from "@/interfaces/plays-minified.interface";
import { Stat } from "@/interfaces/stats.interface";
import { TotalStat } from "@/interfaces/total-stats.interface";
import { rest_service } from "@/lib/appwrite";
import {
  DOMAIN,
  PLAYS_MINIFIED_COLLECTION_ID,
  STATS_COLLECTION_ID,
  TOTAL_STATS_COLLECTION_ID,
} from "@/lib/constants";
import { combineAndSumPlays } from "@/lib/utils";
import { Query } from "appwrite";
import { LucideLineChart, LucidePartyPopper } from "lucide-react";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(DOMAIN),
    title: "Sprobble",
    description: "The best place to track your music",
    openGraph: {
      title: "Sprobble",
      description: "The best place to track your music",
      url: DOMAIN,
      siteName: "sprobble.xyz",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Sprobble",
      description: "The best place to track your music",
    },
  };
}

export default async function Home() {
  const weekToWeek = await rest_service.list<Stat>(STATS_COLLECTION_ID, [
    Query.orderAsc("week_of_year"),
    Query.equal("user_id", "global"),
    Query.select([
      "number_of_plays",
      "user_id",
      "time_spent_listening",
      "week_of_year",
    ]),
  ]);

  const weekToWeekFormatted = combineAndSumPlays(weekToWeek.documents).map(
    (stat) => ({
      name: `Week ${stat.week_of_year}`,
      plays: stat.number_of_plays,
      duration: (Number(stat.time_spent_listening) / 1000 / 60 / 60).toFixed(2),
    }),
  );

  const totalStats = await rest_service.list<TotalStat>(
    TOTAL_STATS_COLLECTION_ID,
  );

  const plays = await rest_service.list<PlayMinified>(
    PLAYS_MINIFIED_COLLECTION_ID,
    [Query.orderDesc("played_at"), Query.limit(12)],
  );

  return (
    <>
      <Header
        title={
          <>
            The Best <br className="md:hidden" />
            Place To
            <br />
            Track Your Music
          </>
        }
        sub="Sprobble"
        altSub={<HeroLoginButton />}
      />
      <section className="relative z-10 pb-12 xl:-mt-48">
        <div className="flex flex-row flex-nowrap gap-4 pb-4 md:items-center md:justify-center">
          <LucideLineChart className="h-10 w-10 flex-none rounded-xl bg-primary-foreground p-2 text-primary" />
          <h3 className="text-lg font-bold text-secondary-foreground md:text-xl">
            Check Out Our Global Stats
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-4 pb-4 md:grid-cols-3">
          <div className="h-56 md:col-span-2 md:h-96">
            <GlobalWeekToWeek initial={weekToWeekFormatted} />
          </div>
          <div className="flex w-full flex-col gap-4">
            <GlobalStats initial={totalStats.documents} />
          </div>
        </div>
      </section>
      <section className="pb-12">
        <div className="flex flex-row flex-nowrap gap-4 pb-4 md:items-center md:justify-center">
          <LucidePartyPopper className="h-10 w-10 flex-none rounded-xl bg-primary-foreground p-2 text-primary" />
          <h3 className="text-lg font-bold text-secondary-foreground md:text-xl">
            Lets&apos; See What Everyone Else Is Listening To
          </h3>
        </div>
        <GlobalHistory initial={plays.documents} />
      </section>
    </>
  );
}
