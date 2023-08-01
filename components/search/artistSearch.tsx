"use client";

import { Loader } from "@/components/loading/loader";
import { Badge } from "@/components/ui/badge";
import { artistCollectionId, databaseId } from "@/lib/appwrite";
import { Artist, Track } from "@/types/Types";
import { Query } from "appwrite";
import Link from "next/link";
import { useCollection } from "react-appwrite";

export default function ArtistSearch({
  params,
}: {
  params: { search: string[] };
}) {
  const { data, isLoading } = useCollection<Artist>(
    databaseId,
    artistCollectionId,
    [Query.search("name", params.search[1])]
  );

  return (
    <section>
      {isLoading && <Loader className="grid w-full place-items-center" />}
      {!isLoading && data?.documents.length == 0 && <p>No results found.</p>}
      <ul className="flex w-full flex-col gap-4">
        {data?.documents.map((artist: Artist, index: number) => (
          <li key={artist.$id}>
            <div className="flex flex-row justify-start gap-4">
              <img
                src={artist.album[0].images[0]}
                className="h-24 w-24 flex-none rounded-lg"
              />
              <div>
                <Link
                  className="truncate text-3xl font-bold hover:text-blue-500"
                  href={`/global/stats/artist/${artist.$id}`}
                >
                  {artist.name}
                </Link>
                <div>
                  <p className="pb-1 text-sm">Tracks:</p>
                  <ul className="flex flex-wrap gap-1">
                    {artist.track.map((track: Track) => (
                      <Badge key={track.$id}>
                        <Link href={`/global/stats/track/${track.$id}`}>
                          {track.name}
                        </Link>
                      </Badge>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
