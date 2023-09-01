import { ArtistStats } from "@/components/artist/artist-stats";
import ArtistCount from "@/components/artist/count";
import { Header } from "@/components/header";
import { Artist } from "@/types/Types";
import { Models } from "appwrite";

export const metadata = {
  title: "Artist Stats",
  description: "Stats for all artists on sprobble.xyz",
};

async function getTop() {
  const artist: Models.Document & Artist = await fetch(
    `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/databases/645c032960cb9f95212b/collections/artist/documents?queries[0]=limit(1)&queries[1]=orderDesc($createdAt)`,
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
    <>
      <Header subTitle="Global" title="Artist Statistics" />
      <section className="grid w-full grid-cols-1 gap-4 rounded-xl border bg-slate-100 p-4 dark:bg-slate-900 md:grid-cols-3">
        <ArtistCount />
      </section>
      <ArtistStats />
    </>
  );
}
