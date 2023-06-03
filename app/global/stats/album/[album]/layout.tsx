import { Album, Artist } from "@/types/Types";

export async function generateMetadata({
  params,
}: {
  params: { album: string };
}) {
  const id = params.album;

  // fetch data
  const album: Album = await fetch(
    `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/v1/databases/645c032960cb9f95212b/collections/album/documents/${id}`,
    {
      headers: {
        "X-Appwrite-Project": process.env
          .NEXT_PUBLIC_APPWRITE_PROJECT_ID as string,
      },
    }
  ).then((res) => res.json());

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

export default function LayoutAlbum({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
