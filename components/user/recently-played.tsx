"use client";

import { History } from "@/components/history";
import { Models, Query } from "appwrite";
import { useEffect, useState } from "react";
import { useAppwrite, useCollection } from "react-appwrite";

const databaseId = "645c032960cb9f95212b";
const collectionId = "plays";

export function UserRecentlyPlayed({ user }: { user: string }) {
  const itemCount = 10;
  const query = [
    Query.orderDesc("played_at"),
    Query.limit(itemCount),
    Query.equal("user_id", user),
  ];

  const { databases } = useAppwrite();

  const [formattedPlays, setFormattedPlays] = useState<any>([]);
  const [queries, setQueries] = useState<any>(query);
  const [pageCount, setPageCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const { data: plays, isLoading } = useCollection(
    databaseId,
    collectionId,
    queries,
    {
      // @ts-ignore
      queryFn: async (): Promise<Models.DocumentList<Models.Document>> => {
        const response = await databases.listDocuments<any>(
          databaseId,
          collectionId,
          queries
        );

        return response;
      },
      keepPreviousData: true,
    }
  );

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
    // @ts-ignore
    setPageCount(Math.ceil(plays.total / itemCount));
    // @ts-ignore
    setFormattedPlays(groupByDate(plays.documents));
  }, [plays]);

  return (
    <History
      title="Recent Plays"
      isLoading={isLoading}
      formattedPlays={formattedPlays}
    />
  );
}
