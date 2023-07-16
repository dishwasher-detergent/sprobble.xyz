import { Header } from "@/components/header";
import StatsCard from "@/components/stats/card";
import { UserRecentlyPlayed } from "@/components/user/recently-played";
import { User } from "@/types/Types";
import { eachWeekOfInterval, getISOWeek } from "date-fns";
import { LucideClock5, LucideTrendingUp } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: { user: string };
}) {
  const id = params.user;

  // fetch data
  const user = await getUserData(id);

  return {
    title: user.name + "'s Listen History",
    description: `Listen history for ${user.name}`,
    openGraph: {
      title: user.name,
      description: `Stats for ${user.name}`,
      url: `https://sprobble.xyz/user/${user.$id}`,
      siteName: "sprobble.xyz",
      locale: "en_US",
      type: "website",
    },
  };
}

async function getUserData(id: string) {
  const user: User = await fetch(
    `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/databases/645c032960cb9f95212b/collections/user/documents/${id}`,
    {
      next: {
        revalidate: 60,
      },
      headers: {
        "X-Appwrite-Project": process.env
          .NEXT_PUBLIC_APPWRITE_PROJECT_ID as string,
      },
    }
  ).then((res) => res.json());

  return user;
}

export default async function UserPage({
  params,
}: {
  params: { user: string };
}) {
  const user = await getUserData(params.user);

  // Get the current week stats.
  const current_week_stats = user.stats.filter(
    (x) => x.week_of_year == getISOWeek(new Date())
  )[0];

  const current_week_duration = (
    Number(current_week_stats.time_spent_listening) /
    1000 /
    60 /
    60
  ).toFixed(2);

  const year_plays = user.stats.reduce((a, b) => a + b.number_of_plays, 0);

  const year_duration = (
    Number(user.stats.reduce((a, b) => a + Number(b.time_spent_listening), 0)) /
    1000 /
    60 /
    60
  ).toFixed(2);

  const weeksInMonth = eachWeekOfInterval({
    start: new Date(),
    end: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
  });

  const current_month_duration = (
    user.stats
      .filter(
        (x) =>
          x.week_of_year >= getISOWeek(weeksInMonth[0]) &&
          x.week_of_year <= getISOWeek(weeksInMonth[weeksInMonth.length - 1])
      )
      .reduce((a, b) => a + Number(b.time_spent_listening), 0) /
    1000 /
    60 /
    60
  ).toFixed(2);

  return (
    <>
      <Header
        title={user.name}
        subTitle={`Created ${new Date(user.created_at).toLocaleDateString(
          "en-us",
          {
            month: "long",
            day: "numeric",
            year: "numeric",
          }
        )}`}
        artwork={`https://api.dicebear.com/6.x/thumbs/svg?seed=${user.$id}`}
        artwork_name={user.name + "'s avatar"}
      />
      <section className="flex flex-col gap-4 py-4">
        <div className="flex w-full flex-row flex-nowrap gap-4 overflow-x-auto">
          <StatsCard
            value={current_week_stats.number_of_plays.toLocaleString()}
          >
            <>
              <span>Week To Date</span>
              <LucideTrendingUp size={16} />
            </>
          </StatsCard>
          <StatsCard value={year_plays.toLocaleString()}>
            <>
              <span>Year To Date Scrobbles</span>
              <LucideTrendingUp size={16} />
            </>
          </StatsCard>
        </div>
        <div className="flex w-full flex-row flex-nowrap gap-4 overflow-x-auto">
          <StatsCard value={`${current_week_duration} hours`}>
            <>
              <span>Week To Date Time spent listening</span>
              <LucideClock5 size={16} />
            </>
          </StatsCard>
          <StatsCard value={`${current_month_duration} hours`}>
            <>
              <span>Month To Date Time spent listening</span>
              <LucideClock5 size={16} />
            </>
          </StatsCard>
          <StatsCard value={`${year_duration} hours`}>
            <>
              <span>Year To Date Time spent listening</span>
              <LucideClock5 size={16} />
            </>
          </StatsCard>
        </div>
      </section>
      <UserRecentlyPlayed user={params.user} />
    </>
  );
}
