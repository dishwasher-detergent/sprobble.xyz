"use client";

import { Loader } from "@/components/loading/loader";
import { albumCollectionId, databaseId } from "@/lib/appwrite";
import { Album, Artist, Track } from "@/types/Types";
import { Query } from "appwrite";
import Link from "next/link";
import { useCollection } from "react-appwrite";
import { Badge } from "../ui/badge";

export default function AlbumSearch({
  params,
}: {
  params: { search: string[] };
}) {
  const { data, isLoading } = useCollection<Album>(
    databaseId,
    albumCollectionId,
    [Query.search("name", params.search[1])]
  );

  return (
    <section>
      {isLoading && <Loader className="grid w-full place-items-center" />}
      {!isLoading && data?.documents.length == 0 && <p>No results found.</p>}
      <ul className="flex w-full flex-col gap-4">
        {data?.documents.map((album: Album) => (
          <li key={album.$id} className="flex w-full flex-row gap-4">
            <img
              src={album.images[0]}
              className="h-24 w-24 flex-none rounded-lg"
            />
            <div className="overflow-hidden">
              <Link
                href={`/global/stats/album/${album.$id}`}
                className="truncate text-3xl font-bold hover:text-blue-500"
              >
                {album.name}
              </Link>
              {album.artist && (
                <p className="truncate text-base">
                  {album.artist.map((item: Artist, index: number) => (
                    <Link
                      key={item.$id}
                      href={`/global/stats/artist/${item.$id}`}
                      className="hover:text-blue-500"
                    >
                      {item.name}
                      {album.artist.length > 1 &&
                      index != album.artist.length - 1
                        ? ", "
                        : ""}
                    </Link>
                  ))}
                </p>
              )}
              <div>
                <p className="pb-1 text-sm">Tracks:</p>
                <ul className="flex flex-wrap gap-1">
                  {album.track.map((track: Track) => (
                    <li key={track.$id}>
                      <Badge>
                        <Link href={`/global/stats/track/${track.$id}`}>
                          {track.name}
                        </Link>
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
