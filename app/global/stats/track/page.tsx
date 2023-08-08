import { Header } from "@/components/header";
import TrackCount from "@/components/track/count";
import TrackStats from "@/components/track/track-stats";

export const metadata = {
  title: "Track Stats",
  description: "Stats for all tracks on sprobble.xyz",
};

export default async function TrackPage() {
  return (
    <section className="space-y-6">
      <Header subTitle="Global" title="Track Statistics" />
      <TrackCount />
      <TrackStats />
    </section>
  );
}
