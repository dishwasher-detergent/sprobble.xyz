"use client";

import { History } from "@/components/history";
import { client, database_service } from "@/lib/appwrite";
import { DATABASE_ID, PLAYS_COLLECTION_ID } from "@/lib/constants";
import { groupByDate } from "@/lib/utils";
import { Play } from "@/types/Types";
import { useEffect, useState } from "react";

export default function Home() {
  const [plays, setPlays] = useState<Play[]>();
  const [loading, setLoading] = useState<boolean>(true);

  async function init() {
    setLoading(true);
    const response = await database_service.list<Play>(PLAYS_COLLECTION_ID);
    const formattedPlays = groupByDate(response.documents);
    setPlays(formattedPlays);
    setLoading(false);
  }

  useEffect(() => {
    // init();

    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.${PLAYS_COLLECTION_ID}.documents`,
      (response) => {
        console.log("test", response);
      }
    );

    return unsubscribe();
  }, []);

  return (
    <>
      <section className="mb-10 flex flex-col justify-between gap-10 rounded-xl bg-gradient-radial px-4 py-12 md:px-24 md:py-48">
        <h1 className="w-full scroll-m-20 pb-4 text-center text-5xl font-bold tracking-tight transition-colors first:mt-0 md:text-7xl">
          The best place to keep track of all your Spotify plays.
        </h1>
        <div className="flex flex-row justify-center">
          {/* <MainLoginWithSpotify /> */}
        </div>
      </section>
      <section className="relative flex w-full flex-col gap-4">
        {/* <UserStats user="global" /> */}
        <div className="flex w-full flex-row flex-nowrap gap-4 overflow-x-auto pb-2">
          {/* <ArtistCount /> */}
          {/* <AlbumCount /> */}
          {/* <TrackCount /> */}
        </div>
      </section>
      <History
        title="See what everyone is listening to"
        isLoading={loading}
        formattedPlays={plays}
      />
    </>
  );
}
