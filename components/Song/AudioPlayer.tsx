import { useAudio } from "@/hooks/useAudio";
import { Progress } from "@/components/ui/progress";
import { LucidePauseCircle, LucidePlayCircle } from "lucide-react";
import { formatTimeForAudioPlayer } from "@/lib/utils";

interface AudioPlayerProps {
  track: {
    preview: string;
    duration: number | undefined;
  };
}

export default function AudioPlayer({ track }: AudioPlayerProps) {
  const { playing, toggle, time } = useAudio(track.preview);
  return (
    <div className="w-full h-12 rounded-lg bg-slate-100 flex items-center gap-4 p-4">
      <button onClick={toggle}>
        {playing ? <LucidePauseCircle /> : <LucidePlayCircle />}
      </button>
      {track.duration && (
        <div className="w-full flex flex-row gap-2 items-center">
          <p className="text-sm font-semibold text-slate-600">
            {formatTimeForAudioPlayer(time)}
          </p>
          <Progress
            className="h-2 bg-slate-300"
            value={(time / track.duration) * 100}
          />
          <p className="text-sm font-semibold text-slate-600">
            {formatTimeForAudioPlayer(track.duration)}
          </p>
        </div>
      )}
    </div>
  );
}
