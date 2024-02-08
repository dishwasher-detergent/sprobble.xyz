import { Header } from "@/components/header";
import { Leaderboard } from "@/components/leaderboard/leaderboard";
import UserPodium from "@/components/leaderboard/user/podium";

export const metadata = {
  title: "Sprobble Leaderboard",
  description: "Leaderboard for all users on Sprobble.xyz",
};

export default function LeaderboardPage() {
  return (
    <>
      <Header subTitle="Global" title="Leaderboard" />
      <UserPodium />
      <Leaderboard />
    </>
  );
}
