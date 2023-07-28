import { ArtistsRecentlyPlayed } from "@/components/artist/recently-played";
import { Header } from "@/components/header";
import StatsCard from "@/components/stats/card";
import { Artist, Play } from "@/types/Types";
import { Models } from "appwrite";

export async function generateMetadata({
  params,
}: {
  params: { artist: string };
}) {
  const id = params.artist;

  // fetch data
  const artist = await getData(id);

  return {
    title: artist.name,
    description: `Stats for ${artist.name}`,
    openGraph: {
      title: artist.name,
      description: `Stats for ${artist.name}`,
      url: "https://sprobble.xyz/global/stats/artist/" + artist.$id,
      siteName: "sprobble.xyz",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      title: artist.name,
      description: `Stats for ${artist.name}`,
    },
  };
}

async function getData(id: string) {
  const artist: Models.Document & Artist = await fetch(
    `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/databases/645c032960cb9f95212b/collections/artist/documents/${id}`,
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

export default async function ArtistStatsPage({
  params,
}: {
  params: { artist: string };
}) {
  const { artist } = params;
  const document = await getData(artist);
  return (
    <>
      <Header
        title={document.name}
        subTitle="Artist"
        artwork={document.album[0].images[0]}
        artwork_name={document.album[0].name}
      />
      <section className="grid w-full grid-cols-1 gap-4 py-6 md:grid-cols-3">
        <StatsCard title="Total Listens">{document.plays.length}</StatsCard>
        <StatsCard title="Total Unique Tracks Listened To">
          {document.track.length}
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

      <ArtistsRecentlyPlayed artist={artist} />
    </>
  );
}
