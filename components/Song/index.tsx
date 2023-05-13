import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Track } from "@/types/Types";
import AudioPlayer from "@/components/Song/AudioPlayer";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Popularity from "./popularity";

interface SongProps {
  content: Track;
}

export default function Song({ content }: SongProps) {
  const album = content.album[0];
  return (
    <Card className="relative">
      <Popularity
        className="absolute -top-2 -right-2 z-10"
        popularity={content.popularity}
      />
      <a
        href={content?.external_urls?.spotify}
        target="_blank"
        rel="noreferrer"
      >
        <CardHeader className="flex flex-row gap-4 p-2 hover:cursor-pointer hover:bg-slate-50">
          {album && album.images.length > 0 && (
            <div className="aspect-square h-20 rounded-lg bg-slate-900 relative overflow-hidden flex-none">
              <Image
                alt={album?.name ?? "Album Cover"}
                src={album?.images[0]}
                fill={true}
              />
            </div>
          )}
          <div className="flex flex-col justify-start flex-1 overflow-hidden">
            <CardTitle className="truncate">{content.name}</CardTitle>
            <CardDescription>
              You Have listened to this song x times.
            </CardDescription>
            {content.explicit && (
              <div>
                <Badge className="text-xs bg-red-600">Explicit</Badge>
              </div>
            )}
          </div>
        </CardHeader>
      </a>
      <CardContent className="p-2">
        {content?.preview && (
          <>
            <p className="p-1 font-semibold text-xs text-slate-600">
              Song Preview
            </p>
            <AudioPlayer
              track={{
                preview: content.preview,
                duration: content.duration,
              }}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
}
