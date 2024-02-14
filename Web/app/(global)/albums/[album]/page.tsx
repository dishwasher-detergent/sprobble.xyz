import { AlbumHistory } from "@/components/realtime/statistics/albums/history";
import { AlbumStats } from "@/components/realtime/statistics/albums/stats";
import { Header } from "@/components/ui/header";
import { SpotifyLink } from "@/components/ui/spotify-link";
import { Album } from "@/interfaces/album.interface";
import { rest_service } from "@/lib/appwrite";
import { ALBUM_COLLECTION_ID } from "@/lib/constants";
import { LucideAudioLines } from "lucide-react";

export default async function AlbumPage({
  params,
}: {
  params: { album: string };
}) {
  const { album: id } = params;
  const album = await rest_service.get<Album>(ALBUM_COLLECTION_ID, id);

  return (
    <>
      <Header
        className="mb-4 xl:mb-12 xl:pb-36"
        title={album?.name}
        sub="Album"
        altSub={<SpotifyLink type="album" id={id} />}
      />
      <AlbumStats initial={album} id={id} />
      <section className="pb-12">
        <div className="flex flex-row flex-nowrap gap-4 pb-4 md:items-center md:justify-center">
          <LucideAudioLines className="h-10 w-10 flex-none rounded-xl bg-primary-foreground p-2 text-primary" />
          <h3 className="text-lg font-bold text-secondary-foreground md:text-xl">
            See Who&apos;s Listening To{" "}
            <span className="text-primary">{album?.name}</span>
          </h3>
        </div>
        <AlbumHistory initial={album} id={id} />
      </section>
    </>
  );
}
