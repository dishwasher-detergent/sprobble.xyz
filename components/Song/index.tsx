import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Play } from "@/types/Types";
import AudioPlayer from "@/components/Song/AudioPlayer";
import Image from "next/image";
import Popularity from "./popularity";

interface SongProps {
  content: Play;
}

export default function Song({ content }: SongProps) {
  const {
    track,
    track: [{ album }],
    played_at,
  } = content;

  const date = new Date(played_at).toLocaleString();

  return (
    <Card className="relative">
      <Popularity
        className="absolute -top-2 -right-2 z-10"
        popularity={track[0].popularity}
      />
      <a href={track[0]?.href} target="_blank" rel="noreferrer">
        <CardHeader className="flex flex-row gap-4 p-2 hover:cursor-pointer hover:bg-slate-50">
          {album[0] && album[0].images.length > 0 && (
            <div className="aspect-square h-20 rounded-lg bg-slate-900 relative overflow-hidden flex-none">
              <Image
                alt={album[0]?.name ?? "album[0] Cover"}
                src={album[0]?.images[0]}
                fill={true}
              />
            </div>
          )}
          <div className="flex flex-col justify-start flex-1 overflow-hidden gap-1">
            <CardTitle className="truncate font-bold">
              {track[0].name}
            </CardTitle>
            <CardDescription className="text-xs">{date}</CardDescription>
            {/* <CardDescription>
              You Have listened to this song x times.
            </CardDescription> */}
          </div>
        </CardHeader>
      </a>
      <CardContent className="p-2">
        {track[0]?.preview && (
          <>
            <p className="p-1 font-semibold text-xs text-slate-600 flex flex-row gap-2 items-center">
              Song Preview
            </p>
            <AudioPlayer
              track={{
                preview: track[0].preview,
                duration: track[0].duration,
              }}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
}
