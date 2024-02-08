"use client";

import { History } from "@/components/history";
import { DATABASE_ID, PLAYS_COLLECTION_ID } from "@/lib/constants";
import { groupByDate } from "@/lib/utils";
import { Query } from "appwrite";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCollection } from "react-appwrite";

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
  const [queries, setQueries] = useState<any>([
    ...baseQuery,
    Query.limit(limit),
    Query.offset(0),
  ]);

  const { data: plays, isLoading } = useCollection(
    DATABASE_ID,
    PLAYS_COLLECTION_ID,
    queries
  );

  const formattedPlays = groupByDate(plays?.documents);
  const pageCount = plays ? Math.ceil(plays.total / limit) : 1;

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
