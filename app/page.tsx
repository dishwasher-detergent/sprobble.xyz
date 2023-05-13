"use client";

import Song from "@/components/Song";
import { useCollection } from "react-appwrite";
import { Query } from "appwrite";
import { Play } from "@/types/Types";
import FilterBar from "@/components/Nav/Filter";
import { useState } from "react";
import Loader from "@/components/Loader";

export default function Home() {
  const [sortValue, setSortValue] = useState<string>(
    Query.orderDesc("played_at")
  );

  const databaseId = "645c032960cb9f95212b";
  const collectionId = "plays";

  const { data: plays, isLoading } = useCollection<Play>(
    databaseId,
    collectionId,
    [sortValue]
  );

  const sort = () => {
    if (sortValue === Query.orderDesc("played_at")) {
      setSortValue(Query.orderAsc("played_at"));
    } else {
      setSortValue(Query.orderDesc("played_at"));
    }
  };

  return (
    <main className="flex min-h-screen flex-col max-w-7xl mx-auto p-2 md:p-8 gap-4">
      <FilterBar sort={() => sort()} sortValue={sortValue} />
      {isLoading ? (
        <div className="p-10 flex-1 flex justify-center">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 md:gap-4">
          {plays &&
            plays.map((play: Play) => <Song content={play} key={play.$id} />)}
        </div>
      )}
    </main>
  );
}
