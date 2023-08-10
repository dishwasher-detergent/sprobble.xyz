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
    description: `${artist.plays.length} sprobbles`,
    openGraph: {
      title: artist.name,
      description: `${artist.plays.length} sprobbles`,
      url: "https://sprobble.xyz/global/stats/artist/" + artist.$id,
      siteName: "sprobble.xyz",
      images: [
        {
          url: artist.album[0].images[0],
          width: 800,
          height: 800,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      title: artist.name,
      description: `${artist.plays.length} sprobbles`,
      card: "summary_large_image",
      images: [artist.album[0].images[0]],
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
        listen={
          <a
            href={document.href}
            target="_blank"
            className="flex flex-row items-center gap-2 text-sm"
          >
            Listen on Spotify
            <span className="relative h-4 w-4 flex-none">
              <img
                className="block h-4 w-4 dark:hidden"
                src="/spotify/icon/Spotify_Icon_RGB_Black.png"
                alt="Spotify Icon Logo"
              />
              <img
                className="hidden h-4 w-4 dark:block"
                src="/spotify/icon/Spotify_Icon_RGB_White.png"
                alt="Spotify Icon Logo"
              />
            </span>
          </a>
        }
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
