import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Track } from "@/types/UsersTopItems";
import AudioPlayer from "@/components/Song/AudioPlayer";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface SongProps {
  content: Track;
}

export default function Song({ content }: SongProps) {
  return (
    <Card>
      <a
        href={content?.external_urls?.spotify}
        target="_blank"
        rel="noreferrer"
      >
        <CardHeader className="flex flex-row gap-4 p-2 hover:cursor-pointer hover:bg-slate-50">
          {content.album && content.album.images.length > 0 && (
            <div className="aspect-square h-20 rounded-lg bg-slate-900 relative overflow-hidden flex-none">
              <Image
                alt={content.album?.name ?? "Album Cover"}
                src={content.album?.images[0].url}
                fill={true}
              />
            </div>
          )}
          <div className="flex flex-col justify-start flex-1 overflow-hidden">
            <CardTitle className="truncate">
              {content.name}asdfasdfasdfasdfasdfasdf
            </CardTitle>
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
        {content?.preview_url && (
          <>
            <p className="p-1 font-semibold text-xs text-slate-600">
              Song Preview
            </p>
            <AudioPlayer
              track={{
                preview: content.preview_url,
                duration: content.duration_ms,
              }}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
}
