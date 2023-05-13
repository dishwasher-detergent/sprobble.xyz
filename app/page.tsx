"use client";

import Song from "@/components/Song";
import { useCollection } from "react-appwrite";
import { Play } from "@/types/Types";

export default function Home() {
  const databaseId = "645c032960cb9f95212b";
  const collectionId = "plays";

  const { data: plays, isLoading } = useCollection<Play>(
    databaseId,
    collectionId
  );

  return (
    <main className="flex min-h-screen flex-col max-w-7xl mx-auto p-2 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 md:gap-4">
        {plays &&
          plays.map((play: Play) => (
            <Song content={play.track[0]} key={play.$id} />
          ))}
      </div>
    </main>
  );
}
