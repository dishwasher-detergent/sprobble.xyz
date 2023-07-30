import { Loader } from "@/components/loading/loader";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { artistCollectionId, databaseId } from "@/lib/appwrite";
import { Artist, Track } from "@/types/Types";
import { Query } from "appwrite";
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
      {isLoading && <Loader />}
      {!isLoading && data?.documents.length == 0 && <p>No results found.</p>}
      <ul className="flex w-full flex-col gap-4">
        {data?.documents.map((artist: Artist, index: number) => (
          <>
            {index != 0 && <Separator />}
            <li key={artist.$id}>
              <a
                className="text-3xl font-bold hover:text-blue-500"
                href={`/global/stats/artist/${artist.$id}`}
              >
                {artist.name}
              </a>
              <div>
                <p className="pt-2 text-sm">Tracks:</p>
                <ul className="flex flex-wrap gap-1">
                  {artist.track.map((track: Track) => (
                    <Badge>
                      <a href={`/global/stats/track?search=${track.name}`}>
                        {track.name}
                      </a>
                    </Badge>
                  ))}
                </ul>
              </div>
            </li>
          </>
        ))}
      </ul>
    </section>
  );
}
