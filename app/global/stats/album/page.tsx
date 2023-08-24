import { AlbumStats } from "@/components/album/album-stats";
import AlbumCount from "@/components/album/count";
import { Header } from "@/components/header";
import { Album } from "@/types/Types";
import { Models } from "appwrite";

export const metadata = {
  title: "Album Stats",
  description: "Stats for all albums on sprobble.xyz",
};

async function getTop() {
  const album: Models.Document & Album = await fetch(
    `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/databases/645c032960cb9f95212b/collections/album/documents?queries[0]=limit(1)&queries[1]=orderDesc($createdAt)`,
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

  return album;
}

export default async function AlbumPage() {
  const { documents } = await getTop();

  return (
    <>
      <Header
        subTitle="Global"
        title="Album Statistics"
        artwork={documents[0].images[0]}
        artwork_name={documents[0].name}
      />
      <section className="grid w-full grid-cols-1 gap-4 rounded-lg border bg-slate-100 p-4 dark:bg-slate-900 dark:text-white md:grid-cols-3">
        <AlbumCount />
      </section>
      <AlbumStats />
    </>
  );
}
