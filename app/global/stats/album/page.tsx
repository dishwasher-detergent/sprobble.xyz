import { AlbumStats } from "@/components/album/album-stats";
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
        revalidate: 0,
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
    <section className="space-y-6">
      <Header
        subTitle="Global"
        title="Album Statistics"
        artwork={documents[0].images[0]}
        artwork_name={documents[0].name}
      />
      <AlbumStats />
    </section>
  );
}
