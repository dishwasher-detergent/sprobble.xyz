import { Skeleton } from "@/components/ui/skeleton";
import { LucideMusic3, LucideTimer } from "lucide-react";

export default function StatsGraphLoading() {
  return (
    <div className="bg-background z-10 flex h-full w-full flex-col gap-4 rounded-3xl border p-2">
      <div className="space-y-2 text-xl font-bold">
        <div className="flex flex-row items-center gap-2">
          <LucideMusic3 className="text-primary bg-primary-foreground h-10 w-10 rounded-xl p-2" />
          <Skeleton className="h-8 w-1/2" />
        </div>
        <div className="flex flex-row items-center gap-2">
          <LucideTimer className="text-primary bg-primary-foreground h-10 w-10 rounded-xl p-2" />
          <Skeleton className="h-8 w-1/2" />
        </div>
      </div>
      <div className="w-full flex-1">
        <Skeleton className="h-full w-full rounded-2xl" />
      </div>
    </div>
  );
}
