import { Play } from "@/types/Types";
import Song from "@/components/Song";

interface GridProps {
  plays: Play[];
}

export default function Grid({ plays }: GridProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 md:gap-4">
      {plays.map((play: Play) => (
        <Song content={play} key={play.$id} />
      ))}
    </div>
  );
}
