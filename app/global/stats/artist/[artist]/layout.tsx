import { Artist } from "@/types/Types";

export async function generateMetadata({
  params,
}: {
  params: { artist: string };
}) {
  const id = params.artist;

  // fetch data
  const artist: Artist = await fetch(
    `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/v1/databases/645c032960cb9f95212b/collections/artist/documents/${id}`,
    {
      headers: {
        "X-Appwrite-Project": process.env
          .NEXT_PUBLIC_APPWRITE_PROJECT_ID as string,
      },
    }
  ).then((res) => res.json());

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

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
