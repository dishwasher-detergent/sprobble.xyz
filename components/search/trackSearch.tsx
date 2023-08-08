"use client";

import { Loader } from "@/components/loading/loader";
import { databaseId, trackCollectionId } from "@/lib/appwrite";
import { Artist, Track } from "@/types/Types";
import { Query } from "appwrite";
import Link from "next/link";
import { useCollection } from "react-appwrite";

export default function TrackSearch({
  params,
}: {
  params: { search: string[] };
}) {
  const { data, isLoading } = useCollection<Track>(
    databaseId,
    trackCollectionId,
    [Query.search("name", params.search[1])]
  );

  return (
    <section>
      {isLoading && <Loader className="grid w-full place-items-center" />}
      {!isLoading && data?.documents.length == 0 && <p>No results found.</p>}
      <ul className="flex w-full flex-col gap-4">
        {data?.documents.map((track: Track) => (
          <li key={track.$id} className="flex w-full flex-row gap-4">
            <img
              src={track.album.images[0]}
              className="h-24 w-24 flex-none rounded-lg"
            />
            <div className="overflow-hidden">
              <div className="flex flex-row items-center gap-4">
                <Link
                  href={`/global/stats/track/${track.$id}`}
                  className="truncate text-xl font-bold hover:text-blue-500"
                >
                  {track.name}
                </Link>
                {track.explicit && (
                  <div
                    className="grid h-5 w-5 place-items-center rounded-md border border-destructive text-xs text-destructive"
                    title="explicit"
                  >
                    E
                  </div>
                )}
              </div>
              <Link
                href={`/global/stats/album/${track.album.$id}`}
                className="truncate text-base hover:text-blue-500"
              >
                {track.album.name}
              </Link>
              {track.artist && (
                <p className="truncate text-base">
                  {track.artist.map((item: Artist, index: number) => (
                    <Link
                      key={item.$id}
                      href={`/global/stats/artist/${item.$id}`}
                      className="hover:text-blue-500"
                    >
                      {item.name}
                      {track.artist.length > 1 &&
                      index != track.artist.length - 1
                        ? ", "
                        : ""}
                    </Link>
                  ))}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
