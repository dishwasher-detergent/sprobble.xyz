import { UserHistory } from "@/components/realtime/statistics/users/history";
import { UserWeekToWeek } from "@/components/realtime/statistics/users/week-to-week";
import { Header } from "@/components/ui/header";
import { PlayMinified } from "@/interfaces/plays-minified.interface";
import { Stat } from "@/interfaces/stats.interface";
import { User } from "@/interfaces/user.interface";
import { database_service } from "@/lib/appwrite";
import {
  PLAYS_MINIFIED_COLLECTION_ID,
  STATS_COLLECTION_ID,
  USER_COLLECTION_ID,
} from "@/lib/constants";
import { combineAndSumPlays } from "@/lib/utils";
import { Query } from "appwrite";
import { LucideAudioLines } from "lucide-react";

export default async function UserPage({
  params,
}: {
  params: { user: string };
}) {
  const { user: id } = params;
  const user = await database_service.get<User>(USER_COLLECTION_ID, id);
  const plays = await database_service.list<PlayMinified>(
    PLAYS_MINIFIED_COLLECTION_ID,
    [Query.equal("user_id", id), Query.orderDesc("played_at")],
  );
  const stats = await database_service.list<Stat>(STATS_COLLECTION_ID, [
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
        className="mb-4 xl:mb-12 xl:pb-36"
        title={user?.name}
        sub="Sprobble"
      />
      <section className="relative z-10 h-96 pb-4 md:grid-cols-2 xl:-mt-24 xl:pb-12">
        <UserWeekToWeek initial={weekToWeekFormatted} id={id} />
      </section>
      <section className="pb-12">
        <div className="flex flex-row flex-nowrap gap-4 pb-4 md:items-center md:justify-center">
          <LucideAudioLines className="h-10 w-10 flex-none rounded-xl bg-primary-foreground p-2 text-primary" />
          <h3 className="text-lg font-bold text-secondary-foreground md:text-xl">
            See What <span className="text-primary">{user?.name}</span> Is
            Listening To!
          </h3>
        </div>
        <UserHistory initial={plays.documents} id={id} />
      </section>
    </>
  );
}
