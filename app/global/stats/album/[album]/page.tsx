import { AlbumRecentlyPlayed } from "@/components/album/recently-played";
import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Album, Artist } from "@/types/Types";
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
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="h-6 text-sm font-medium tracking-tight">
              Total Plays From This Album
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{document.plays.length}</p>
          </CardContent>
        </Card>
      </section>

      <AlbumRecentlyPlayed album={album} />
    </>
  );
}

export const revalidate = 60;
