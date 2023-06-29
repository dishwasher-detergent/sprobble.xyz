import { ArtistStats } from "@/components/artist/artist-stats";
import { Header } from "@/components/header";
import { Artist } from "@/types/Types";
import { Models } from "appwrite";

export const metadata = {
  title: "Artist Stats",
  description: "Stats for all artists on sprobble.xyz",
};

async function getTop() {
  const artist: Models.Document & Artist = await fetch(
    `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/v1/databases/645c032960cb9f95212b/collections/artist/documents?queries[0]=limit(1)&queries[1]=orderDesc($createdAt)`,
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

  return artist;
}

export default async function ArtistPage() {
  const { documents } = await getTop();

  return (
    <section className="space-y-6">
      <Header subTitle="Global" title="Artist Statistics" />
      <ArtistStats />
    </section>
  );
}
