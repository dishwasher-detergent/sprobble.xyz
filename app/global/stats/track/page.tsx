import { Header } from "@/components/header";
import TrackStats from "@/components/track/track-stats";
import { Track } from "@/types/Types";
import { Models } from "appwrite";

export const metadata = {
  title: "Track Stats",
  description: "Stats for all tracks on sprobble.xyz",
};

async function getTop() {
  const track: Models.Document & Track = await fetch(
    `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/v1/databases/645c032960cb9f95212b/collections/track/documents?queries[0]=limit(1)&queries[1]=orderDesc($createdAt)`,
    {
      headers: {
        "X-Appwrite-Project": process.env
          .NEXT_PUBLIC_APPWRITE_PROJECT_ID as string,
      },
    }
  ).then((res) => res.json());

  return track;
}

export default async function TrackPage() {
  const { documents } = await getTop();

  return (
    <section className="space-y-6">
      <Header subTitle="Global" title="Track Statistics" />
      <TrackStats />
    </section>
  );
}
