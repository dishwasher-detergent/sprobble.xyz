import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import spotify from "@/lib/spotify";
import { Track, UsersTopTracks } from "@/types/UsersTopItems";
import Song from "@/components/Song";
import { SpotifyAuth } from "@/components/Spotify/Auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const tracks = (await spotify.topTracks(
    //@ts-ignore
    session?.user?.accessToken
  )) as UsersTopTracks;

  return (
    <main className="flex min-h-screen flex-col p-24">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {tracks.items &&
          tracks.items.map((item: Track) => (
            <Song content={item} key={item.id} />
          ))}
      </div>
      <div>{<SpotifyAuth />}</div>
    </main>
  );
}
