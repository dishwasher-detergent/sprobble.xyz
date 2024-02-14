import { HistoryLoading } from "@/components/loading/history";
import { Header } from "@/components/ui/header";
import { Skeleton } from "@/components/ui/skeleton";
import { StatCard } from "@/components/ui/stat-card";
import {
  LucideAudioLines,
  LucideDisc3,
  LucideLineChart,
  LucideMusic3,
  LucidePartyPopper,
} from "lucide-react";

export default function Loading() {
  return (
    <>
      <Header
        title={
          <>
            The Best <br className="md:hidden" />
            Place To
            <br />
            Track Your Music
          </>
        }
        sub="Sprobble"
        altSub={<Skeleton className="h-12 w-48" />}
      />
      <section className="relative z-10 pb-12 xl:-mt-48">
        <div className="flex flex-row flex-nowrap gap-4 pb-4 md:items-center md:justify-center">
          <LucideLineChart className="h-10 w-10 flex-none rounded-xl bg-primary-foreground p-2 text-primary" />
          <h3 className="text-lg font-bold text-secondary-foreground md:text-xl">
            Check Out Our Global Stats
          </h3>
        </div>
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
            <StatCard
              title="Total Unique Albums"
              stat={0}
              icon={<LucideDisc3 className="h-12 w-12" />}
              loading={true}
            />
          </div>
        </div>
      </section>
      <section className="pb-12">
        <div className="flex flex-row flex-nowrap gap-4 pb-4 md:items-center md:justify-center">
          <LucidePartyPopper className="h-10 w-10 flex-none rounded-xl bg-primary-foreground p-2 text-primary" />
          <h3 className="text-lg font-bold text-secondary-foreground md:text-xl">
            Lets&apos; See What Everyone Else Is Listening To
          </h3>
        </div>
        <HistoryLoading />
      </section>
    </>
  );
}
