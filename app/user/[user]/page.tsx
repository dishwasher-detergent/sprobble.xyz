import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRecentlyPlayed } from "@/components/user/recently-played";
import { Models } from "appwrite";

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
  const user: Models.User<any> = await fetch(
    `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/users/${id}`,
    {
      next: {
        revalidate: 60,
      },
      headers: {
        "X-Appwrite-Project": process.env
          .NEXT_PUBLIC_APPWRITE_PROJECT_ID as string,
        "X-Appwrite-Key": process.env.APPWRITE_API_KEY as string,
      },
    }
  ).then((res) => res.json());

  return user;
}

async function getData(id: string) {
  const plays: Models.DocumentList<Models.Document> = await fetch(
    `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/databases/645c032960cb9f95212b/collections/plays/documents?queries[0]=equal("user_id", ["${id}"])`,
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

  return plays;
}

export default async function UserPage({
  params,
}: {
  params: { user: string };
}) {
  const [user, plays] = await Promise.all([
    getUserData(params.user),
    getData(params.user),
  ]);

  return (
    <div className="mx-auto max-w-7xl">
      <Header
        title={user.name}
        artwork={`https://api.dicebear.com/6.x/thumbs/svg?seed=${user.$id}`}
        artwork_name={user.name + "'s avatar"}
      />
      <section className="grid w-full grid-cols-1 gap-4 py-6 md:grid-cols-3">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="h-6 text-sm font-medium tracking-tight">
              Total Plays
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{plays.total}</p>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="h-6 text-sm font-medium tracking-tight">
              Time spent listening
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">
              {(
                plays.documents
                  .map((x) => x.track.duration)
                  .reduce((a: any, b: any) => a + b, 0) /
                1000 /
                60 /
                60
              ).toFixed(2)}{" "}
              hours
            </p>
          </CardContent>
        </Card>
      </section>
      <UserRecentlyPlayed user={params.user} />
    </div>
  );
}

export const revalidate = 60;
