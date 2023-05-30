"use client";

import Loader from "@/components/Loader";
import HistoryItem from "@/components/history/item";
import { Play } from "@/types/Types";
import { Models, Query } from "appwrite";
import { LucideCalendarClock } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppwrite, useCollection } from "react-appwrite";
import { Pagination } from "./pagination";

const databaseId = "645c032960cb9f95212b";
const collectionId = "plays";

interface HistoryProps {
  user?: string;
}

export function History({ user }: HistoryProps) {
  const itemCount = 25;
  const query = [
    Query.orderDesc("played_at"),
    Query.limit(itemCount),
    ...(user ? [Query.equal("user_id", user)] : []),
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
    console.log(pageCount)
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
    console.log(pageCount)
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
    <section>
      <div>
        <h2 className="mb-6 text-xl font-black md:text-3xl">Recently Played</h2>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ul className="flex flex-col gap-10">
            {formattedPlays.map((play: any) => (
              <div key={play.date}>
                <h3 className="flex items-center pb-4 text-base font-bold text-slate-400">
                  <LucideCalendarClock size={16} className="mr-2" />
                  {new Date(play.date).toLocaleDateString("en-us", {
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </h3>
                <ul className="ml-1.5 flex flex-col gap-2 border-l pl-4">
                  {play.tracks.map((item: Play) => (
                    <li key={item.$id}>
                      <HistoryItem
                        played_at={item.played_at}
                        track={item.track}
                        user_id={user ? "" : item.user_id}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </ul>
          <Pagination
            next={() => nextPage()}
            previous={() => prevPage()}
            page={page}
            pageCount={pageCount}
            // @ts-ignore
            resultCount={plays.total}
            itemCount={itemCount}
          />
        </>
      )}
    </section>
  );
}
