import { ArtistHistory } from "@/components/realtime/artists/history";
import { ArtistStats } from "@/components/realtime/artists/stats";
import { Header } from "@/components/ui/header";
import { SpotifyLink } from "@/components/ui/spotify-link";
import { Artist } from "@/interfaces/artist.interface";
import { ARTIST_COLLECTION_ID } from "@/lib/constants";
import { rest_service } from "@/lib/rest";
import { LucideAudioLines } from "lucide-react";
import { redirect } from "next/navigation";

// export async function generateMetadata({
//   params,
// }: {
//   params: { artist: string };
// }): Promise<Metadata> {
//   const { artist: id } = params;
//   const artist = await rest_service.get<Artist>(ARTIST_COLLECTION_ID, id);

//   return {
//     metadataBase: new URL(DOMAIN),
//     title: `Sprobble - ${artist.name}`,
//     description: `${artist.name}'s Sprobble Statistics.`,
//     openGraph: {
//       title: `Sprobble - ${artist.name}`,
//       description: `${artist.name}'s Sprobble Statistics.`,
//       url: DOMAIN,
//       siteName: "sprobble.xyz",
//       locale: "en_US",
//       type: "website",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: `Sprobble - ${artist.name}`,
//       description: `${artist.name}'s Sprobble Statistics.`,
//     },
//   };
// }

export default async function ArtistPage({
  params,
}: {
  params: { artist: string };
}) {
  const { artist: id } = params;
  const artist = await rest_service.get<Artist>(ARTIST_COLLECTION_ID, id);

  if (artist.code) {
    redirect("/");
  }

  return (
    <>
      <Header
        className="mb-4 xl:mb-12 xl:pb-36"
        title={artist?.name}
        sub="Artist"
        altSub={<SpotifyLink type="artist" id={id} />}
      />
      <ArtistStats initial={artist} id={id} />
      <section className="pb-12">
        <div className="flex flex-row flex-nowrap gap-4 pb-4 md:items-center md:justify-center">
          <LucideAudioLines className="h-10 w-10 flex-none rounded-xl bg-primary-foreground p-2 text-primary" />
          <h3 className="text-lg font-bold text-secondary-foreground md:text-xl">
            See Who&apos;s Listening To{" "}
            <span className="text-primary">{artist?.name}</span>
          </h3>
        </div>
        <ArtistHistory initial={artist} id={id} />
      </section>
    </>
  );
}
