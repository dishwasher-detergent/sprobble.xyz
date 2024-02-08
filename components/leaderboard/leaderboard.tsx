"use client";

import { Pagination } from "@/components/history/pagination";
import { Loader } from "@/components/loading/loader";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import {
  AVATAR_BUCKET_ID,
  DATABASE_ID,
  PROJECT_ID,
  USER_COLLECTION_ID,
} from "@/lib/constants";
import { User } from "@/types/Types";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { ColumnDef } from "@tanstack/react-table";
import { Query } from "appwrite";
import { LucideClock2, LucideMusic2 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCollection } from "react-appwrite";

const columns: ColumnDef<any>[] = [
  {
    accessorKey: "avatar",
    header: "Avatar",
    cell(props) {
      return (
        <Avatar className="block h-14 w-14 flex-none overflow-hidden rounded-xl">
          <AvatarImage
            src={`${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${AVATAR_BUCKET_ID}/files/${props.row.original.avatar}/view?project=${PROJECT_ID}&width=100&height=100&quality=75`}
            alt={`${props.row.original.name}'s Avatar`}
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
          href={`/user/${props.row.original.id}`}
          className="hover:text-blue-500"
        >
          <p className="text-lg">{props.row.original.name}</p>
          <p>{`Joined ${new Date(props.row.original.joined).toLocaleDateString(
            "en-us",
            {
              month: "long",
              day: "numeric",
              year: "numeric",
            }
          )}`}</p>
        </Link>
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
          {props.row.original.plays.toLocaleString()}
        </span>
      );
    },
  },
  {
    accessorKey: "duration",
    header: "Time Spent Listening",
    cell(props) {
      return (
        <span className="flex flex-row items-center gap-4">
          <LucideClock2 className="flex-none" size={16} />
          {props.row.original.duration.toLocaleString()} Hours
        </span>
      );
    },
  },
];

export function Leaderboard() {
  const query = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = query.get("page") ? parseInt(query.get("page") as string) : 1;
  const limit = query.get("limit")
    ? parseInt(query.get("limit") as string)
    : 12;

  const baseQuery = [Query.orderAsc("name"), Query.notEqual("$id", "global")];
  const [queries, setQueries] = useState<any>([
    ...baseQuery,
    Query.limit(limit),
    Query.offset(0),
  ]);

  const {
    data: users,
    isLoading,
    isError,
  } = useCollection(DATABASE_ID, USER_COLLECTION_ID, queries, {
    keepPreviousData: true,
  });

  const data = users
    ? users?.documents.map((user: User) => {
        return {
          name: user.name,
          joined: user.created_at,
          id: user.$id,
          avatar: user.avatar,
          plays: user.stats.reduce(
            (acc, stat) => acc + stat.number_of_plays,
            0
          ),
          duration: (
            user.stats.reduce(
              (acc, stat) => acc + Number(stat.time_spent_listening),
              0
            ) /
            1000 /
            60 /
            60
          ).toFixed(2),
        };
      })
    : [];

  const pageCount = users ? Math.ceil(users.total / limit) : 1;
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
          if (query[1].length > 0)
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
          placeholder="Search Users"
          onChange={(e) => setSearch(e.target.value)}
          value={params.get("search") || ""}
        />
      </nav>
      <DataTable columns={columns} data={data} />
      <Pagination page={page} pageCount={pageCount} isLoading={isLoading} />
    </section>
  );
}
