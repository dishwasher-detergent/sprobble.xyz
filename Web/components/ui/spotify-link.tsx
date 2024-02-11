import { Button } from "@/components/ui/button";
import { LucideExternalLink } from "lucide-react";

export interface SpotifyLinkProps {
  id: string;
  type: "artist" | "track" | "album";
}

export function SpotifyLink({ type, id }: SpotifyLinkProps) {
  return (
    <div className="absolute bottom-0 left-0 z-10 flex flex-row items-center gap-2 p-2 xl:-left-[5%] xl:bottom-auto xl:top-0">
      <Button
        size="icon"
        variant="default"
        className="grid h-12 w-12 place-items-center rounded-3xl"
        asChild
      >
        <a href={`https://open.spotify.com/${type}/${id}`} target="_blank">
          <LucideExternalLink className="h-5 w-5" />
        </a>
      </Button>
      <div className="h-12 w-48 overflow-hidden rounded-3xl">
        <img
          className="h-full"
          src={`https://scannables.scdn.co/uri/plain/jpeg/8649ed/white/256/spotify:${type}:${id}`}
        />
      </div>
    </div>
  );
}
