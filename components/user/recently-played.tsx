"use client";

import { History } from "@/components/history";
import { Query } from "appwrite";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCollection } from "react-appwrite";

const databaseId = "645c032960cb9f95212b";
const collectionId = "plays";

export function UserRecentlyPlayed({ user }: { user: string }) {
  const query = useSearchParams();

  const page = query.get("page") ? parseInt(query.get("page") as string) : 1;
  const limit = query.get("limit")
    ? parseInt(query.get("limit") as string)
    : 12;

  const baseQuery = [
    Query.orderDesc("played_at"),
    Query.equal("user_id", user),
  ];
  const [formattedPlays, setFormattedPlays] = useState<any>([]);
  const [queries, setQueries] = useState<any>([
    ...baseQuery,
    Query.limit(limit),
    Query.offset(0),
  ]);
  const [pageCount, setPageCount] = useState<number>(0);

  const { data: plays, isLoading } = useCollection(
    databaseId,
    collectionId,
    queries
  );

  const groupByDate = (data: any) => {
    if (!data) return;

    return data.reduce((acc: any, val: any) => {
      const date = new Date(val.played_at)
        .toLocaleString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        })
        .match(/\d{2}\/\d{2}\/\d{4}/g)
        ?.toString();

      if (!date) return;

      const item = acc.find((item: any) =>
        item.date.match(new RegExp(date, "g"))
      );

      if (!item) acc.push({ date: date, tracks: [val] });
      else item.tracks.push(val);

      return acc;
    }, []);
  };

  useEffect(() => {
    if (isLoading) return;
    if (!plays) return;

    setPageCount(Math.ceil(plays.total / limit));
    setFormattedPlays(groupByDate(plays.documents));
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
      }
    });

    setQueries(newQueries);
  }, [query]);

  return (
    <History
      title="Recent Plays"
      isLoading={isLoading}
      formattedPlays={formattedPlays}
      paginationProps={{
        page: page,
        pageCount: pageCount,
        itemCount: limit,
        totalPlays: plays?.total,
      }}
    />
  );
}
