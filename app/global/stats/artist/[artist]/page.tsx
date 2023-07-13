import { ArtistsRecentlyPlayed } from "@/components/artist/recently-played";
import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="h-6 text-sm font-medium tracking-tight">
              Time spent listening
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">
              {(
                document.plays
                  .map((x: Play) => x.track.duration)
                  .reduce((a: any, b: any) => a + b, 0) /
                1000 /
                60 /
                60
              ).toFixed(2)}{" "}
              hours
            </p>
          </CardContent>
        </Card>
      </section>

      <ArtistsRecentlyPlayed artist={artist} />
    </>
  );
}
