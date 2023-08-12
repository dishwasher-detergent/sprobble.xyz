import { Header } from "@/components/header";
import { Leaderboard } from "@/components/leaderboard/leaderboard";
import UserPodium from "@/components/leaderboard/user/podium";

export const metadata = {
  title: "Sprobble Leaderboard",
  description: "Leaderboard for all users on Sprobble.xyz",
};

export default function LeaderboardPage() {
  return (
    <section className="space-y-6">
      <Header subTitle="Global" title="Leaderboard" />
      <UserPodium />
      <Leaderboard />
    </section>
  );
}
