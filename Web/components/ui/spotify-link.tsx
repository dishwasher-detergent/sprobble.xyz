import { Spotify } from "@/components/ui/spotify";

export interface SpotifyLinkProps {
  id: string;
  type: "artist" | "track" | "album";
}

export function SpotifyLink({ type, id }: SpotifyLinkProps) {
  return (
    <a
      href={`https://open.spotify.com/${type}/${id}`}
      target="_blank"
      className="absolute bottom-0 left-0 z-10 flex flex-row flex-wrap items-center gap-2 p-2 xl:-left-[5%] xl:bottom-auto xl:top-0"
    >
      <div className="flex h-12 flex-row items-center gap-2 overflow-hidden text-nowrap rounded-3xl bg-primary pl-2 pr-4 font-bold text-white">
        <Spotify className="h-7 w-7" variant="white" />
        Play on Spotify
      </div>
      <div className="h-12 w-48 overflow-hidden rounded-3xl">
        <img
          className="h-full"
          src={`https://scannables.scdn.co/uri/plain/jpeg/7c3aed/white/640/spotify:${type}:${id}`}
          alt="Spotify Scannable Code"
        />
      </div>
    </a>
  );
}
