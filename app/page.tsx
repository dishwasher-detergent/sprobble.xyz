"use client";

import Song from "@/components/Song";
import { useCollection } from "react-appwrite";
import { Query } from "appwrite";
import { Play } from "@/types/Types";
import FilterBar from "@/components/Nav/Filter";
import { useState } from "react";
import Loader from "@/components/Loader";
import Grid from "@/components/Layout/Grid";
import List from "@/components/Layout/List";

export default function Home() {
  const [sortValue, setSortValue] = useState<string>(
    Query.orderDesc("played_at")
  );

  const [layoutValue, setLayoutValue] = useState<string>("grid");

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

  const layout = () => {
    if (layoutValue === "grid") {
      setLayoutValue("list");
    } else {
      setLayoutValue("grid");
    }
  };

  return (
    <main className="flex min-h-screen flex-col max-w-7xl mx-auto p-2 md:p-8 gap-4">
      <FilterBar
        sort={() => sort()}
        sortValue={sortValue}
        layout={() => layout()}
        layoutValue={layoutValue}
      />
      {isLoading ? (
        <div className="p-10 flex-1 flex justify-center">
          <Loader />
        </div>
      ) : layoutValue == "grid" ? (
        <Grid plays={plays ?? []} />
      ) : (
        <List plays={plays ?? []} />
      )}
    </main>
  );
}
