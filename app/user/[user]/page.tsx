import { RecentlyPlayed } from "@/components/global/recently-played";
import { Header } from "@/components/header";
import UserStats from "@/components/user/stats";
import { avatarBucketId, projectId } from "@/lib/appwrite";
import { User } from "@/types/Types";

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
      title: user.name + "'s Listen History",
      description: `${user.stats.pop()?.number_of_plays} Sprobbles this week!`,
      url: `https://sprobble.xyz/user/${user.$id}`,
      siteName: "sprobble.xyz",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: `/api/og/user?id=${user.$id}`,
          width: 800,
          height: 800,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: user.name,
      description: `${user.stats.pop()?.number_of_plays} Sprobbles this week!`,
      images: [`/api/og/user?id=${user.$id}`],
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

  return (
    <>
      <Header
        title={user.name}
        subTitle={`Joined ${new Date(user.created_at).toLocaleDateString(
          "en-us",
          {
            month: "long",
            day: "numeric",
            year: "numeric",
          }
        )}`}
        artwork={`https://data.kennethbass.com/v1/storage/buckets/${avatarBucketId}/files/${user.$id}/preview?project=${projectId}&width=400&height=400&quality=100`}
        artwork_name={user.name + "'s avatar"}
      />
      <section className="py-4">
        <UserStats user={params.user} />
      </section>
      <RecentlyPlayed user={params.user} />
    </>
  );
}
