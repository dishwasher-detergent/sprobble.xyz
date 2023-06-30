"use client";

import { Pagination } from "@/components/history/pagination";
import { Loader } from "@/components/loading/loader";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { formatTimeForAudioPlayer } from "@/lib/utils";
import { Artist, Track } from "@/types/Types";
import { Models, Query } from "appwrite";
import {
  LucideClock,
  LucideDisc2,
  LucideMusic2,
  LucidePersonStanding,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppwrite, useCollection } from "react-appwrite";

const databaseId = "645c032960cb9f95212b";
const collectionId = "track";

export default function TrackStats() {
  const itemCount = 10;
  const query = [Query.limit(itemCount)];

  const { databases } = useAppwrite();

  const [queries, setQueries] = useState<any>(query);
  const [pageCount, setPageCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const {
    data: plays,
    isLoading,
    isError,
  } = useCollection(databaseId, collectionId, queries, {
    queryFn: async (): Promise<any> => {
      const response = await databases.listDocuments<any>(
        databaseId,
        collectionId,
        queries
      );

      return response as Models.DocumentList<Models.Document>;
    },
    keepPreviousData: true,
  });

  const nextPage = () => {
    if (!plays) return;
    if (page == pageCount) return;
    setPage(page + 1);
    setQueries([
      ...query,
      // @ts-ignore
      Query.cursorAfter(plays.documents[plays.documents.length - 1].$id),
    ]);
  };

  const prevPage = () => {
    if (!plays) return;
    if (page == 1) return;
    setPage(page - 1);
    // @ts-ignore
    setQueries([...query, Query.cursorBefore(plays.documents[0].$id)]);
  };

  useEffect(() => {
    if (isLoading) return;
    // @ts-ignore
    setPageCount(Math.ceil(plays.total / itemCount));
  }, [plays]);

  if (isError) return <div>Something went wrong</div>;

  return isLoading ? (
    <Loader className="grid h-48 w-full place-items-center" />
  ) : (
    <>
      <nav>
        <Input
          className="max-w-xs"
          placeholder="Search Tracks"
          onChange={(e) => {
            e.target.value.length == 0
              ? setQueries(query)
              : setQueries([
                  ...query,
                  Query.search("name", `'${e.target.value}'`),
                ]);
          }}
        />
      </nav>
      <div className="w-full overflow-auto rounded-lg border p-1 shadow">
        <ul className="min-w-[40rem]">
          {/* @ts-ignore */}
          {plays?.documents.map((track: Track) => {
            return (
              <li
                key={track.$id}
                className="flex flex-row gap-2 rounded-lg p-2 px-4 text-slate-600 hover:bg-slate-50"
              >
                <p
                  className="flex w-16 flex-none flex-row items-center gap-2 truncate"
                  title="Plays"
                >
                  <LucideMusic2 size={16} />
                  {track.plays.length}
                </p>
                <Avatar className="block h-14 w-14 flex-none overflow-hidden rounded-lg bg-slate-900">
                  <AvatarImage src={track.album.images[1]} />
                </Avatar>
                <div className="flex flex-1 flex-col">
                  <p className="flex flex-row items-center gap-2">
                    <LucidePersonStanding size={16} />
                    {track.artist.map((artist: Artist, index: number) => (
                      <Link
                        key={artist.$id}
                        href={`/global/stats/artist/${artist.$id}`}
                      >
                        {index != 0 && ", "}
                        {artist.name}
                      </Link>
                    ))}
                  </p>
                  <p className="flex flex-row items-center gap-2">
                    <LucideDisc2 size={16} />
                    <Link href={`/global/stats/album/${track.album.$id}`}>
                      {track.album.name}
                    </Link>
                  </p>
                </div>

                <p className="flex flex-row items-center gap-2">
                  <LucideClock size={16} />
                  {formatTimeForAudioPlayer(track.duration)}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
      <Pagination
        next={() => nextPage()}
        previous={() => prevPage()}
        page={page}
        pageCount={pageCount}
        // @ts-ignore
        resultCount={plays?.total}
        itemCount={itemCount}
      />
    </>
  );
}
