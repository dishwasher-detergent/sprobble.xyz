import AlbumCount from "@/components/album/count";
import ArtistCount from "@/components/artist/count";
import { RecentlyPlayed } from "@/components/global/recently-played";
import { MainLoginWithSpotify } from "@/components/main-login-with-spotify";
import TrackCount from "@/components/track/count";
import UserStats from "@/components/user/stats";

export default function Home() {
  return (
    <>
      <section className="mb-10 flex flex-col gap-10 rounded-lg bg-slate-100 p-4 dark:bg-slate-900">
        <div className="flex flex-col gap-4 py-10">
          <div className="flex w-full flex-col items-center gap-6">
            <h1 className="max-w-4xl scroll-m-20 pb-4 text-center text-5xl font-bold tracking-tight transition-colors first:mt-0 md:text-7xl">
              The best place to keep track of all your Spotify plays.
            </h1>
            <MainLoginWithSpotify />
          </div>
        </div>
        <div className="relative flex flex-col gap-4">
          <UserStats user="global" />
          <div className="flex w-full flex-row flex-nowrap gap-4 overflow-x-auto">
            <ArtistCount />
            <AlbumCount />
            <TrackCount />
          </div>
          <div
            className="absolute -top-2/3 left-0 right-0 z-0 h-96"
            style={{
              background:
                "radial-gradient(at bottom, hsl(var(--primary)) 0%, transparent 50%)",
            }}
          />
        </div>
      </section>
      <RecentlyPlayed />
    </>
  );
}
