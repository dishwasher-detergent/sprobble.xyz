"use client";

import { Pagination } from "@/components/history/pagination";
import { Loader } from "@/components/loading/loader";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { artistCollectionId, databaseId } from "@/lib/appwrite";
import { Artist } from "@/types/Types";
import { ColumnDef } from "@tanstack/react-table";
import { Query } from "appwrite";
import {
  LucideCassetteTape,
  LucideDisc2,
  LucideMusic2,
  LucidePersonStanding,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCollection } from "react-appwrite";

const columns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell(props) {
      return (
        <span className="flex flex-row items-center gap-4">
          <LucidePersonStanding className="flex-none" size={16} />
          <Link
            href={`/global/stats/artist/${props.row.original.id}`}
            className="flex flex-row items-center gap-4 hover:text-blue-500"
          >
            {props.row.original.name}
          </Link>
        </span>
      );
    },
  },
  {
    accessorKey: "albums",
    header: "Number of Albums",
    cell(props) {
      return (
        <span className="flex flex-row items-center gap-4">
          <LucideDisc2 className="flex-none" size={16} />
          {props.row.original.albums}
        </span>
      );
    },
  },
  {
    accessorKey: "songs",
    header: "Number of Songs",
    cell(props) {
      return (
        <span className="flex flex-row items-center gap-4">
          <LucideCassetteTape className="flex-none" size={16} />
          {props.row.original.songs}
        </span>
      );
    },
  },
  {
    accessorKey: "plays",
    header: "Number of Plays",
    cell(props) {
      return (
        <span className="flex flex-row items-center gap-4">
          <LucideMusic2 className="flex-none" size={16} />
          {props.row.original.plays}
        </span>
      );
    },
  },
];

export function ArtistStats() {
  const query = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = query.get("page") ? parseInt(query.get("page") as string) : 1;
  const limit = query.get("limit")
    ? parseInt(query.get("limit") as string)
    : 12;

  const baseQuery = [Query.orderDesc("$createdAt")];
  const [queries, setQueries] = useState<any>([
    ...baseQuery,
    Query.limit(limit),
    Query.offset(0),
  ]);

  const {
    data: plays,
    isLoading,
    isError,
  } = useCollection(databaseId, artistCollectionId, queries, {
    keepPreviousData: true,
  });

  const data = plays
    ? plays?.documents.map((artist: Artist) => ({
        name: artist.name,
        id: artist.$id,
        url: artist.href,
        plays: artist.plays.length,
        songs: artist.track.length,
        albums: artist.album.length,
      }))
    : [];

  const pageCount = plays ? Math.ceil(plays.total / limit) : 1;
  const params = new URLSearchParams(Array.from(query.entries()));

  useEffect(() => {
    const queries = Array.from(query.entries());

    if (queries.length == 0) {
      setQueries(baseQuery);
      return;
    }

    const newQueries = [...baseQuery];
    queries.forEach((query) => {
      switch (query[0]) {
        case "page":
          newQueries.push(Query.offset((parseInt(query[1]) - 1) * limit));
          break;
        case "limit":
          newQueries.push(Query.limit(parseInt(query[1])));
          break;
        case "search":
          newQueries.push(Query.search("name", query[1]));
          break;
      }
    });

    setQueries(newQueries);
  }, [query]);

  const setSearch = (search: string) => {
    const params = new URLSearchParams(Array.from(query.entries()));
    if (search.length > 0) {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  if (isError) return <div>Something went wrong</div>;

  return isLoading ? (
    <Loader className="grid h-48 w-full place-items-center" />
  ) : (
    <section className="flex flex-col gap-2">
      <nav>
        <Input
          className="max-w-xs"
          placeholder="Search Artists"
          onChange={(e) => setSearch(e.target.value)}
          value={params.get("search") || ""}
        />
      </nav>
      <DataTable columns={columns} data={data} />
      <Pagination page={page} pageCount={pageCount} isLoading={isLoading} />
    </section>
  );
}
