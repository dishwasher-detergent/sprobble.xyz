import { HistoryLoading } from "@/components/loading/history";
import { Header } from "@/components/ui/header";
import { Skeleton } from "@/components/ui/skeleton";
import { SpotifyLink } from "@/components/ui/spotify-link";
import { StatCard } from "@/components/ui/stat-card";
import { LucideAudioLines, LucideMusic3 } from "lucide-react";

export default function AlbumLoading() {
  return (
    <>
      <Header
        title={
          <Skeleton className="md:h-18 lg:h-22 relative z-10 mt-2 h-16 w-52" />
        }
        sub="Album"
        altSub={<SpotifyLink type="album" id={"5qNws4KuryY0VNrdtcDwkR"} />}
      />
      <section className="relative z-10 pb-16 xl:-mt-48">
        <div className="grid grid-cols-1 gap-4 pb-4 md:grid-cols-3">
          <div className="h-56 md:col-span-2 md:h-96">
            <div className="z-10 flex h-full min-h-24 w-full flex-col gap-4 rounded-3xl border bg-background p-2">
              <Skeleton className="h-full w-full" />
            </div>
          </div>
          <div className="flex w-full flex-col gap-4">
            <StatCard
              title="Total Plays"
              stat={0}
              icon={<LucideAudioLines className="h-12 w-12" />}
              loading={true}
            />
            <StatCard
              title="Total Unique Songs"
              stat={0}
              icon={<LucideMusic3 className="h-12 w-12" />}
              loading={true}
            />
          </div>
        </div>
      </section>
      <section className="pb-16">
        <div className="flex flex-row flex-nowrap gap-4 pb-4 md:items-center md:justify-center">
          <LucideAudioLines className="h-10 w-10 flex-none rounded-xl bg-primary-foreground p-2 text-primary" />
          <h3 className="flex items-center gap-2 text-lg font-bold text-secondary-foreground md:text-xl">
            See Who&apos;s Listening To <Skeleton className="h-8 w-24" />
          </h3>
        </div>
        <HistoryLoading />
      </section>
    </>
  );
}
