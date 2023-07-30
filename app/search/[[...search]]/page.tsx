"use client";

import { Header } from "@/components/header";
import Search from "@/components/search";
import AlbumSearch from "@/components/search/albumSearch";
import ArtistSearch from "@/components/search/artistSearch";
import TrackSearch from "@/components/search/trackSearch";
import UserSearch from "@/components/search/userSearch";
import { Badge } from "@/components/ui/badge";

export default function SearchPage({
  params,
}: {
  params: { search: string[] };
}) {
  console.log(params.search);
  if (params.search && params.search.length == 2) {
    return (
      <>
        <section className="flex flex-col gap-4 pb-4">
          <Header
            title="Find whatever your heart desires."
            subTitle="Search for tracks, artists, albums, and users."
            description={
              <div className="w-96 max-w-full">
                <Search
                  categoryInit={params.search[0]}
                  searchInit={params.search[1]}
                />
              </div>
            }
          />
          <div className="rounded-lg bg-slate-100 px-4 py-2 dark:bg-slate-800">
            <p>
              <span className="mr-2 font-bold">Searched:</span>
              <span className="space-x-1">
                <Badge className="text-sm">{decodeURI(params.search[0])}</Badge>
                <Badge className="text-sm">{decodeURI(params.search[1])}</Badge>
              </span>
            </p>
          </div>
        </section>
        {(params.search[0] == "track" && <TrackSearch params={params} />) ||
          (params.search[0] == "artist" && <ArtistSearch params={params} />) ||
          (params.search[0] == "album" && <AlbumSearch params={params} />) ||
          (params.search[0] == "user" && <UserSearch params={params} />)}
      </>
    );
  }

  return (
    <section className="flex flex-col gap-4 pb-4">
      <Header
        title="Find whatever your heart desires."
        subTitle="Search for tracks, artists, albums, and users."
        description={
          <div className="w-96 max-w-full">
            <Search />
          </div>
        }
      />
      <div className="w-full text-center font-bold">
        <p>You've not searched for anything yet /:</p>
      </div>
    </section>
  );
}
