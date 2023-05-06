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
      <CardHeader className="flex flex-row gap-4">
        {content.album && content.album.images.length > 0 && (
          <div className="aspect-square h-20 rounded-lg bg-slate-900 relative overflow-hidden">
            <Image
              alt={content.album?.name ?? "Album Cover"}
              src={content.album?.images[0].url}
              fill={true}
            />
          </div>
        )}
        <div className="flex flex-col justify-start">
          <CardTitle>{content.name}</CardTitle>
          <CardDescription>
            You Have listened to this song x times.
          </CardDescription>
          <div>
            <Badge className="text-xs">Preview</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {content?.preview_url && (
          <AudioPlayer
            track={{
              preview: content.preview_url,
              duration: content.duration_ms,
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}
