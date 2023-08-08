import AlbumCount from "@/components/album/count";
import ArtistCount from "@/components/artist/count";
import { RecentlyPlayed } from "@/components/global/recently-played";
import TrackCount from "@/components/track/count";
import UserStats from "@/components/user/stats";

export default function Home() {
  return (
    <>
      <section className="flex flex-col gap-10 pb-10">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-black md:text-3xl">Users Stats</h2>
          <UserStats />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-black md:text-3xl">Music Stats</h2>
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
