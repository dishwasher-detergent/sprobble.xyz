import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRecentlyPlayed } from "@/components/user/recently-played";
import { User } from "@/types/Types";
import { getISOWeek } from "date-fns";

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

  console.log(user);

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

  return (
    <div className="mx-auto max-w-7xl">
      <Header
        title={user.name}
        artwork={`https://api.dicebear.com/6.x/thumbs/svg?seed=${user.$id}`}
        artwork_name={user.name + "'s avatar"}
      />
      <section className="flex flex-col gap-4 py-4">
        <div className="flex w-full flex-row flex-nowrap gap-2 overflow-x-auto">
          <Card className="min-w-[20rem] flex-1">
            <CardHeader>
              <CardTitle className="h-6 text-sm font-medium tracking-tight">
                Week To Date Scrobbles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">
                {current_week_stats.number_of_plays}
              </p>
            </CardContent>
          </Card>
          <Card className="min-w-[20rem] flex-1">
            <CardHeader>
              <CardTitle className="h-6 text-sm font-medium tracking-tight">
                Year To Date Scrobbles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{year_plays}</p>
            </CardContent>
          </Card>
        </div>
        <div className="flex w-full flex-row flex-nowrap gap-2 overflow-x-auto">
          <Card className="min-w-[20rem] flex-1">
            <CardHeader>
              <CardTitle className="h-6 text-sm font-medium tracking-tight">
                Week To Date Time spent listening
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">
                {current_week_duration}&nbsp;hours
              </p>
            </CardContent>
          </Card>
          <Card className="min-w-[20rem] flex-1">
            <CardHeader>
              <CardTitle className="h-6 text-sm font-medium tracking-tight">
                Year To Date Time spent listening
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{year_duration}&nbsp;hours</p>
            </CardContent>
          </Card>
        </div>
      </section>
      <UserRecentlyPlayed user={params.user} />
    </div>
  );
}

export const revalidate = 60;
