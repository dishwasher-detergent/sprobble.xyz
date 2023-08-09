import { Header } from "@/components/header";
import { Leaderboard } from "@/components/leaderboard/leaderboard";

export default function LeaderboardPage() {
  return (
    <section className="space-y-6">
      <Header subTitle="Global" title="Leaderboard" />
      <Leaderboard />
    </section>
  );
}
