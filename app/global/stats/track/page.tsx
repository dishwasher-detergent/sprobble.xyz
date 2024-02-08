import { Header } from "@/components/header";
import TrackCount from "@/components/track/count";
import TrackStats from "@/components/track/track-stats";

export const metadata = {
  title: "Track Stats",
  description: "Stats for all tracks on sprobble.xyz",
};

export default async function TrackPage() {
  return (
    <>
      <Header subTitle="Global" title="Track Statistics" />
      <section className="grid w-full grid-cols-1 gap-4 rounded-xl border bg-slate-100 p-4 dark:bg-slate-900 md:grid-cols-3">
        <TrackCount />
      </section>
      <TrackStats />
    </>
  );
}
