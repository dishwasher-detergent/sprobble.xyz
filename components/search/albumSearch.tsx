import { Loader } from "@/components/loading/loader";
import { albumCollectionId, databaseId } from "@/lib/appwrite";
import { Album, Artist } from "@/types/Types";
import { Query } from "appwrite";
import { useCollection } from "react-appwrite";

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
              className="h-16 w-16 flex-none rounded-lg"
            />
            <div className="overflow-hidden">
              <div className="flex flex-row items-center gap-4">
                <a
                  href={`/global/stats/album/${album.$id}`}
                  className="truncate text-xl font-bold hover:text-blue-600"
                >
                  {album.name}
                </a>
              </div>
              {album.artist && (
                <p className="truncate text-sm">
                  {album.artist.map((item: Artist, index: number) => (
                    <a
                      key={item.$id}
                      href={`/global/stats/artist/${item.$id}`}
                      className="hover:text-blue-600"
                    >
                      {item.name}
                      {album.artist.length > 1 &&
                      index != album.artist.length - 1
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
