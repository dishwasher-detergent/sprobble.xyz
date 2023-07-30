import { Loader } from "@/components/loading/loader";
import { databaseId, trackCollectionId } from "@/lib/appwrite";
import { Artist, Track } from "@/types/Types";
import { Query } from "appwrite";
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
      {isLoading && <Loader />}
      {!isLoading && data?.documents.length == 0 && <p>No results found.</p>}
      <ul className="flex w-full flex-col gap-4">
        {data?.documents.map((track: Track) => (
          <li key={track.$id} className="flex w-full flex-row gap-4">
            <div>
              <img
                src={track.album.images[0]}
                className="h-16 w-16 rounded-xl"
              />
            </div>
            <div>
              <div className="flex flex-row items-center gap-4">
                <p className="truncate text-xl font-bold">{track.name}</p>
                {track.explicit && (
                  <div
                    className="grid h-5 w-5 place-items-center rounded-md border border-destructive text-xs text-destructive"
                    title="explicit"
                  >
                    E
                  </div>
                )}
              </div>
              <a
                href={`/global/stats/album/${track.album.$id}`}
                className="truncate text-sm hover:text-blue-500"
              >
                {track.album.name}
              </a>
              {track.artist && (
                <p className="truncate text-sm">
                  {track.artist.map((item: Artist, index: number) => (
                    <a
                      key={item.$id}
                      href={`/global/stats/artist/${item.$id}`}
                      className="hover:text-blue-500"
                    >
                      {item.name}
                      {track.artist.length > 1 &&
                      index != track.artist.length - 1
                        ? ", "
                        : ""}
                    </a>
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
