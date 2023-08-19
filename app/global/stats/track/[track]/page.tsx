import { Header } from "@/components/header";
import StatsCard from "@/components/stats/card";
import { TracksRecentlyPlayed } from "@/components/track/recently-played";
import { Track } from "@/types/Types";
import { Models } from "appwrite";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: { track: string };
}) {
  const id = params.track;

  // fetch data
  const track = await getData(id);

  return {
    title: `${track.name} by ${track.artist.map((x) => x.name).join(", ")}`,
    description: `${track.plays.length} sprobbles`,
    openGraph: {
      title: `${track.name} by ${track.artist.map((x) => x.name).join(", ")}`,
      description: `${track.plays.length} sprobbles`,
      url: "https://sprobble.xyz/global/stats/track/" + track.$id,
      siteName: "sprobble.xyz",
      images: [
        {
          url: track.album.images[0],
          width: 800,
          height: 800,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      title: `${track.name} by ${track.artist.map((x) => x.name).join(", ")}`,
      description: `${track.plays.length} sprobbles`,
      card: "summary_large_image",
      images: [track.album.images[0]],
    },
  };
}

async function getData(id: string) {
  const track: Models.Document & Track = await fetch(
    `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/databases/645c032960cb9f95212b/collections/track/documents/${id}`,
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

  return track;
}

export default async function TrackStatsPage({
  params,
}: {
  params: { track: string };
}) {
  const { track } = params;
  const document = await getData(track);

  return (
    <>
      <Header
        title={document.name}
        subTitle={document.artist.map((x, index: number) => {
          return (
            <span key={x.$id}>
              {index > 0 && " ,"}
              <Link
                href={`/global/stats/artist/${x.$id}`}
                className="hover:text-blue-500"
              >
                {x.name}
              </Link>
            </span>
          );
        })}
        description={
          <Link
            href={`/global/stats/album/${document.album.$id}`}
            className="hover:text-blue-500"
          >
            {document.album.name}
          </Link>
        }
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
        artwork={document.album.images[0]}
        artwork_name={document.album.name}
      />
      <section className="my-6 grid w-full grid-cols-1 gap-4 rounded-lg bg-slate-100 p-4 dark:bg-slate-900 md:grid-cols-3">
        <StatsCard title="Total Listens">{document.plays.length}</StatsCard>
      </section>

      <TracksRecentlyPlayed track={track} />
    </>
  );
}
