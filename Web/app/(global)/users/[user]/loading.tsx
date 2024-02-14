import { HistoryLoading } from "@/components/loading/history";
import { Header } from "@/components/ui/header";
import { Skeleton } from "@/components/ui/skeleton";
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
      <section className="relative z-10 pb-4 xl:-mt-24 xl:pb-12">
        <div className="h-56 md:col-span-2 md:h-96">
          <div className="z-10 flex h-full min-h-24 w-full flex-col gap-4 rounded-3xl border bg-background p-2">
            <Skeleton className="h-full w-full" />
          </div>
        </div>
      </section>
      <section className="pb-12">
        <div className="flex flex-row flex-nowrap gap-4 pb-4 md:items-center md:justify-center">
          <LucideAudioLines className="h-10 w-10 flex-none rounded-xl bg-primary-foreground p-2 text-primary" />
          <h3 className="flex items-center gap-2 text-lg font-bold text-secondary-foreground md:text-xl">
            See What <Skeleton className="h-8 w-24" /> Is Listening To!
          </h3>
        </div>
        <HistoryLoading />
      </section>
    </>
  );
}
