import { MusicCardLoading } from "@/components/loading/music-card";

interface HistoryLoadingProps {
  count?: number;
}

export function HistoryLoading({ count = 10 }: HistoryLoadingProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(count)].map((x, index) => (
        <MusicCardLoading key={index} />
      ))}
    </div>
  );
}
