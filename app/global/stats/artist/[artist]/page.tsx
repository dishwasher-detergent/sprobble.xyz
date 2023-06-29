import { ArtistsRecentlyPlayed } from "@/components/artist/recently-played";
import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Artist } from "@/types/Types";
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
      <h3 className="font-bold">Artist Stats</h3>
      <Header
        title={document.name}
        subTitle="Artist"
        artwork={document.album[0].images[0]}
        artwork_name={document.album[0].name}
      />
      <section className="grid w-full grid-cols-1 gap-4 py-6 md:grid-cols-3">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="h-6 text-sm font-medium tracking-tight">
              Total Listens
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{document.plays.length}</p>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="h-6 text-sm font-medium tracking-tight">
              Total Unique Tracks Listened To
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{document.track.length}</p>
          </CardContent>
        </Card>
      </section>

      <ArtistsRecentlyPlayed artist={artist} />
    </>
  );
}

export const revalidate = 60;
