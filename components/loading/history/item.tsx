import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function HistoryItemLoading() {
  return (
    <article className="w-full rounded-lg border-none p-2 text-slate-900 md:w-72">
      <div className="pb-6">
        <Skeleton className="aspect-square w-full rounded-lg" />
        <div className="flex h-24 flex-col gap-4 pt-2">
          <Skeleton className="h-7 w-full max-w-[200px] flex-none" />
          <Skeleton className="h-4 w-full max-w-[150px] flex-none" />
          <div className="flex flex-none flex-row gap-1">
            <Skeleton className="h-4 w-[75px]" />
            <Skeleton className="h-4 w-[75px]" />
            <Skeleton className="h-4 w-[75px]" />
          </div>
          <p className="flex flex-row items-center gap-4 text-sm">
            Listen on Spotify
            <span className="relative h-4 w-4 flex-none">
              <Image
                src="/spotify/icon/Spotify_Icon_RGB_Black.png"
                alt="Spotify Icon Logo"
                fill
                sizes="(max-width: 16px) 100vw"
              />
            </span>
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <div className="row flex items-center gap-4">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-4 w-[75px]" />
        </div>
        <Skeleton className="h-4 w-[150px]" />
      </div>
    </article>
  );
}
