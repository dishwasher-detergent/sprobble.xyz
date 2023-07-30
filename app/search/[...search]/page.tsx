"use client";

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
  if (params.search.length == 2) {
    return (
      <>
        <section className="flex flex-col gap-4 pb-4">
          <Search
            categoryInit={params.search[0]}
            searchInit={params.search[1]}
          />
          <p>
            <span className="mr-2 font-bold">Searched:</span>
            <span className="space-x-1">
              <Badge className="text-sm" variant="secondary">
                {decodeURI(params.search[0])}
              </Badge>
              <Badge className="text-sm" variant="secondary">
                {decodeURI(params.search[1])}
              </Badge>
            </span>
          </p>
        </section>
        {(params.search[0] == "track" && <TrackSearch params={params} />) ||
          (params.search[0] == "artist" && <ArtistSearch params={params} />) ||
          (params.search[0] == "album" && <AlbumSearch params={params} />) ||
          (params.search[0] == "user" && <UserSearch params={params} />)}
      </>
    );
  }
}
