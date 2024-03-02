import { UserHistory } from "@/components/realtime/users/history";
import { WeekToWeek } from "@/components/realtime/week-to-week";
import { Header } from "@/components/ui/header";
import { SpotifyLink } from "@/components/ui/spotify-link";
import { StatsContainer } from "@/components/ui/stats-container";
import { PlayMinified } from "@/interfaces/plays-minified.interface";
import { Stat } from "@/interfaces/stats.interface";
import { User } from "@/interfaces/user.interface";
import {
  DOMAIN,
  PLAYS_MINIFIED_COLLECTION_ID,
  STATS_COLLECTION_ID,
  USER_COLLECTION_ID,
} from "@/lib/constants";
import { rest_service } from "@/lib/rest";
import { combineAndSumPlays } from "@/lib/utils";
import { Query } from "appwrite";
import { LucideAudioLines } from "lucide-react";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { user: string };
}): Promise<Metadata> {
  const { user: id } = params;
  const user = await rest_service.get<User>(USER_COLLECTION_ID, id);

  return {
    metadataBase: new URL(DOMAIN),
    title: `Sprobble - ${user.name}`,
    description: `${user.name}'s Sprobble Statistics.`,
    openGraph: {
      title: `Sprobble - ${user.name}`,
      description: `${user.name}'s Sprobble Statistics.`,
      url: DOMAIN,
      siteName: "sprobble.xyz",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Sprobble - ${user.name}`,
      description: `${user.name}'s Sprobble Statistics.`,
    },
  };
}

export default async function UserPage({
  params,
}: {
  params: { user: string };
}) {
  const { user: id } = params;
  const user = await rest_service.get<User>(USER_COLLECTION_ID, id);

  if (user.code) {
    redirect("/");
  }

  const plays = await rest_service.list<PlayMinified>(
    PLAYS_MINIFIED_COLLECTION_ID,
    [Query.equal("user_id", id), Query.orderDesc("played_at")],
  );
  const stats = await rest_service.list<Stat>(STATS_COLLECTION_ID, [
    Query.equal("user_id", id),
    Query.select([
      "number_of_plays",
      "user_id",
      "time_spent_listening",
      "week_of_year",
    ]),
  ]);

  const weekToWeekFormatted = combineAndSumPlays(stats.documents).map(
    (stat) => ({
      name: `Week ${stat.week_of_year}`,
      plays: stat.number_of_plays,
      duration: (Number(stat.time_spent_listening) / 1000 / 60 / 60).toFixed(2),
    }),
  );

  return (
    <>
      <Header
        className="pb-28 pt-16 md:pt-32"
        title={user?.name}
        sub="Users"
        altSub={
          user?.spotify_user_id && (
            <SpotifyLink type="user" id={user?.spotify_user_id} />
          )
        }
      />
      <StatsContainer
        weekToWeek={<WeekToWeek initial={weekToWeekFormatted} id={id} />}
      />
      <section className="pb-8">
        <div className="flex flex-row flex-nowrap gap-4 pb-4 md:items-center md:justify-center">
          <LucideAudioLines className="h-10 w-10 flex-none rounded-xl bg-primary-foreground p-2 text-primary dark:bg-primary dark:text-primary-foreground" />
          <h3 className="text-lg font-bold text-secondary-foreground md:text-xl">
            See What{" "}
            <span className="text-primary dark:text-primary-foreground">
              {user?.name}
            </span>{" "}
            Is Listening To!
          </h3>
        </div>
        <UserHistory initial={plays.documents} id={id} />
      </section>
    </>
  );
}
