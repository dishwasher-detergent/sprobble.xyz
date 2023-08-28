import AlbumCount from "@/components/album/count";
import ArtistCount from "@/components/artist/count";
import { RecentlyPlayed } from "@/components/global/recently-played";
import { MainLoginWithSpotify } from "@/components/main-login-with-spotify";
import TrackCount from "@/components/track/count";
import UserStats from "@/components/user/stats";

export default function Home() {
  return (
    <>
      <section className="mb-10 flex justify-between gap-10 rounded-lg p-4 flex-col">
        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex w-full flex-col items-start gap-6">
            <h1 className="max-w-4xl scroll-m-20 pb-4 text-left text-5xl font-bold tracking-tight transition-colors first:mt-0 md:text-7xl">
              The best place to keep track of all your Spotify plays.
            </h1>
            <MainLoginWithSpotify />
          </div>
        </div>
        <div className="relative flex w-full flex-col gap-4">
          <UserStats user="global" />
          <div className="flex w-full flex-row flex-nowrap gap-4 overflow-x-auto pb-2">
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
