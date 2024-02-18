import { MusicCardLoading } from "@/components/loading/music-card";
import { HistoryContainer } from "@/components/ui/history-container";

interface HistoryLoadingProps {
  count?: number;
}

export function HistoryLoading({ count = 10 }: HistoryLoadingProps) {
  return (
    <HistoryContainer>
      {[...Array(count)].map((x, index) => (
        <MusicCardLoading key={index} />
      ))}
    </HistoryContainer>
  );
}
