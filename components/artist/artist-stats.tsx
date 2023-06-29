"use client";

import { Pagination } from "@/components/history/pagination";
import { Loader } from "@/components/loading/loader";
import { Input } from "@/components/ui/input";
import { Artist } from "@/types/Types";
import { Models, Query } from "appwrite";
import {
  LucideCassetteTape,
  LucideDisc2,
  LucideMusic2,
  LucidePersonStanding,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppwrite, useCollection } from "react-appwrite";

const databaseId = "645c032960cb9f95212b";
const collectionId = "artist";

export function ArtistStats() {
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
          placeholder="Search Artists"
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
          {plays?.documents.map((artist: Artist) => {
            return (
              <li className="flex flex-row gap-2 rounded-lg p-2 px-4 text-slate-600 hover:bg-slate-50">
                <Link
                  className="flex flex-1 flex-row items-center gap-2 truncate pr-4"
                  title="Plays"
                  href={`/global/stats/artist/${artist.$id}`}
                >
                  <LucidePersonStanding size={16} />
                  {artist.name}
                </Link>
                <p
                  className="flex w-16 flex-row items-center justify-center gap-2 truncate"
                  title="Plays"
                >
                  <LucideMusic2 size={16} />
                  {artist.plays.length}
                </p>
                <p
                  className="flex w-16 flex-row items-center justify-center gap-2 truncate"
                  title="Tracks"
                >
                  <LucideCassetteTape size={16} />
                  {artist.track.length}
                </p>
                <p
                  className="flex w-16 flex-row items-center justify-center gap-2 truncate"
                  title="Albums"
                >
                  <LucideDisc2 size={16} />
                  {artist.album.length}
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
