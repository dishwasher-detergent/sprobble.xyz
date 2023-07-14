"use client";

import { Pagination } from "@/components/history/pagination";
import { Loader } from "@/components/loading/loader";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { Album } from "@/types/Types";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { ColumnDef } from "@tanstack/react-table";
import { Query } from "appwrite";
import { LucideCassetteTape, LucideDisc2, LucideMusic2 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCollection } from "react-appwrite";

const databaseId = "645c032960cb9f95212b";
const collectionId = "album";

const columns: ColumnDef<any>[] = [
  {
    accessorKey: "album_art",
    header: "Album Cover",
    cell(props) {
      return (
        <Avatar className="block h-14 w-14 overflow-hidden rounded-lg">
          <AvatarImage
            src={props.row.original.album_art}
            alt={props.row.original.name}
          />
        </Avatar>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell(props) {
      return (
        <Link
          href={`/global/stats/album/${props.row.original.id}`}
          className="flex flex-row items-center gap-2 hover:text-blue-600"
        >
          <LucideDisc2 size={16} />
          {props.row.original.name}
        </Link>
      );
    },
  },
  {
    accessorKey: "songs",
    header: "Number of Songs",
    cell(props) {
      return (
        <span className="flex flex-row items-center gap-2">
          <LucideCassetteTape size={16} />
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
        <span className="flex flex-row items-center gap-2">
          <LucideMusic2 size={16} />
          {props.row.original.plays}
        </span>
      );
    },
  },
];

export function AlbumStats() {
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
  const [pageCount, setPageCount] = useState<number>(0);

  const {
    data: plays,
    isLoading,
    isError,
  } = useCollection(databaseId, collectionId, queries, {
    keepPreviousData: true,
  });

  const data = plays
    ? plays?.documents.map((album: Album) => ({
        album_art: album.images[1],
        name: album.name,
        id: album.$id,
        url: album.href,
        plays: album.plays.length,
        songs: album.track.length,
      }))
    : [];

  useEffect(() => {
    if (isLoading) return;
    if (!plays) return;
    setPageCount(Math.ceil(plays.total / limit));
  }, [plays]);

  useEffect(() => {
    const queries = Array.from(query.entries());

    if (queries.length == 0) return;

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
    <>
      <nav>
        <Input
          className="max-w-xs"
          placeholder="Search Albums"
          onChange={(e) => setSearch(e.target.value)}
        />
      </nav>
      <DataTable columns={columns} data={data} />
      <Pagination page={page} pageCount={pageCount} isLoading={isLoading} />
    </>
  );
}
