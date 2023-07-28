import { AlbumRecentlyPlayed } from "@/components/album/recently-played";
import { Header } from "@/components/header";
import StatsCard from "@/components/stats/card";
import { Album, Artist, Play } from "@/types/Types";
import { Models } from "appwrite";

export async function generateMetadata({
  params,
}: {
  params: { album: string };
}) {
  const id = params.album;

  // fetch data
  const album = await getData(id);

  return {
    title: album.name,
    description: `Stats for ${album.name} by ${album.artist
      .map((x: Artist) => x.name)
      .join(", ")}`,
    openGraph: {
      title: album.name,
      description: `Stats for ${album.name} by ${album.artist
        .map((x: Artist) => x.name)
        .join(", ")}`,
      url: "https://sprobble.xyz/global/stats/album/" + album.$id,
      siteName: "sprobble.xyz",
      images: [
        {
          url: album.images[0],
          width: 800,
          height: 800,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: album.name,
      description: `Stats for ${album.name} by ${album.artist
        .map((x: Artist) => x.name)
        .join(", ")}`,
      images: [album.images[0]],
    },
  };
}

async function getData(id: string) {
  const album: Models.Document & Album = await fetch(
    `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/databases/645c032960cb9f95212b/collections/album/documents/${id}`,
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

export default async function AlbumStatsPage({
  params,
}: {
  params: { album: string };
}) {
  const { album } = params;
  const document = await getData(album);

  return (
    <>
      <Header
        title={document.name}
        subTitle="Album"
        artwork={document.images[0]}
        artwork_name={document.name}
      />
      <section className="grid w-full grid-cols-1 gap-4 py-6 md:grid-cols-3">
        <StatsCard title="Total Plays From This Album">
          {document.plays.length}
        </StatsCard>
        <StatsCard title="Time spent listening">
          {`${(
            document.plays
              .map((x: Play) => x.track.duration)
              .reduce((a: any, b: any) => a + b, 0) /
            1000 /
            60 /
            60
          ).toFixed(2)} hours`}
        </StatsCard>
      </section>
      <AlbumRecentlyPlayed album={album} />
    </>
  );
}
