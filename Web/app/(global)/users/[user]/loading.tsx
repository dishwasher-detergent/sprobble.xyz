import { HistoryLoading } from "@/components/loading/history";
import { Header } from "@/components/ui/header";
import { Skeleton } from "@/components/ui/skeleton";
import { StatsContainer } from "@/components/ui/stats-container";
import { LucideAudioLines } from "lucide-react";

export default function UserLoading() {
  return (
    <>
      <Header
        className="mb-4 xl:mb-12 xl:pb-36"
        title={
          <Skeleton className="md:h-18 lg:h-22 relative z-10 mt-2 h-16 w-52" />
        }
        sub="Sprobble"
      />
      <StatsContainer
        weekToWeek={
          <div className="h-full w-full rounded-[1.75rem] bg-background p-2">
            <Skeleton className="h-full w-full rounded-3xl" />
          </div>
        }
      />
      <section className="pb-16">
        <div className="flex flex-row flex-nowrap gap-4 pb-4 md:items-center md:justify-center">
          <LucideAudioLines className="h-10 w-10 flex-none rounded-xl bg-primary-foreground p-2 text-primary dark:bg-primary dark:text-primary-foreground" />
          <h3 className="flex items-center gap-2 text-lg font-bold text-secondary-foreground md:text-xl">
            See What <Skeleton className="h-8 w-24" /> Is Listening To!
          </h3>
        </div>
        <HistoryLoading />
      </section>
    </>
  );
}
