import AlbumCount from "@/components/album/count";
import ArtistCount from "@/components/artist/count";
import { RecentlyPlayed } from "@/components/global/recently-played";
import Title from "@/components/layout/title";
import TrackCount from "@/components/track/count";
import UserStats from "@/components/user/stats";
import { LucideMusic, LucideUser } from "lucide-react";

export default function Home() {
  return (
    <>
      <section className="flex flex-col gap-10 pb-10">
        <div className="flex flex-col gap-4">
          <Title
            className="text-2xl text-slate-700 md:text-3xl"
            icon={<LucideUser size={18} />}
          >
            Users Stats
          </Title>
          <UserStats user="global" />
        </div>
        <div className="flex flex-col gap-4">
          <Title
            className="text-2xl text-slate-700 md:text-3xl"
            icon={<LucideMusic size={18} />}
          >
            Music Stats
          </Title>
          <div className="flex w-full flex-row flex-nowrap gap-4 overflow-x-auto">
            <ArtistCount />
            <AlbumCount />
            <TrackCount />
          </div>
        </div>
      </section>
      <RecentlyPlayed />
    </>
  );
}
