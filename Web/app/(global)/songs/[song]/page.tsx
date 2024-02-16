import { SongHistory } from "@/components/realtime/songs/history";
import { SongStats } from "@/components/realtime/songs/stats";
import { Header } from "@/components/ui/header";
import { SpotifyLink } from "@/components/ui/spotify-link";
import { Track } from "@/interfaces/track.interface";
import { TRACK_COLLECTION_ID } from "@/lib/constants";
import { rest_service } from "@/lib/rest";
import { LucideAudioLines } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

// export async function generateMetadata({
//   params,
// }: {
//   params: { song: string };
// }): Promise<Metadata> {
//   const { song: id } = params;
//   const song = await rest_service.get<Track>(TRACK_COLLECTION_ID, id);

//   return {
//     metadataBase: new URL(DOMAIN),
//     title: `Sprobble - ${song.name}`,
//     description: `${song.name}'s Sprobble Statistics.`,
//     openGraph: {
//       title: `Sprobble - ${song.name}`,
//       description: `${song.name}'s Sprobble Statistics.`,
//       url: DOMAIN,
//       siteName: "sprobble.xyz",
//       locale: "en_US",
//       type: "website",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: `Sprobble - ${song.name}`,
//       description: `${song.name}'s Sprobble Statistics.`,
//     },
//   };
// }

export default async function SongPage({
  params,
}: {
  params: { song: string };
}) {
  const { song: id } = params;
  const song = await rest_service.get<Track>(TRACK_COLLECTION_ID, id);

  if (song.code) {
    redirect("/");
  }

  return (
    <>
      <Header
        className="mb-4 xl:mb-12 xl:pb-36"
        title={song?.name}
        sub={song?.artist.map((x, index) => (
          <Link key={x.$id} href={`/artists/${x.$id}`}>
            {index > 0 && ", "}
            {x.name}
          </Link>
        ))}
        altSub={<SpotifyLink type="track" id={id} />}
      />
      <SongStats initial={song} id={id} />
      <section className="pb-12">
        <div className="flex flex-row flex-nowrap gap-4 pb-4 md:items-center md:justify-center">
          <LucideAudioLines className="h-10 w-10 flex-none rounded-xl bg-primary-foreground p-2 text-primary" />
          <h3 className="text-lg font-bold text-secondary-foreground md:text-xl">
            See Who&apos;s Listening To{" "}
            <span className="text-primary">{song?.name}</span>
          </h3>
        </div>
        <SongHistory initial={song} id={id} />
      </section>
    </>
  );
}
