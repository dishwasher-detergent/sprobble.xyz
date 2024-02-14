import { HistoryLoading } from "@/components/loading/history";
import { Header } from "@/components/ui/header";
import { Skeleton } from "@/components/ui/skeleton";
import { SpotifyLink } from "@/components/ui/spotify-link";
import { StatCard } from "@/components/ui/stat-card";
import { StatCardContainer } from "@/components/ui/stat-card-container";
import { LucideAudioLines, LucideDisc3, LucideMusic3 } from "lucide-react";

export default function ArtistLoading() {
  return (
    <>
      <Header
        className="mb-4 xl:mb-12 xl:pb-36"
        title={
          <Skeleton className="md:h-18 lg:h-22 relative z-10 mt-2 h-16 w-52" />
        }
        sub="Artist"
        altSub={<SpotifyLink type="artist" id={"1bDWGdIC2hardyt55nlQgG"} />}
      />
      <StatCardContainer>
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
        <StatCard
          title="Total Unique Albums"
          stat={0}
          icon={<LucideDisc3 className="h-12 w-12" />}
          loading={true}
        />
      </StatCardContainer>
      <section className="pb-12">
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
