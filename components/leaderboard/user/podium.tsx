"use client";

import Podium from "@/components/leaderboard/podium";
import { databaseId, userCollectionId } from "@/lib/appwrite";
import { User } from "@/types/Types";
import { Query } from "appwrite";
import { useCollection } from "react-appwrite";

export default function UserPodium() {
  const { data: users, isLoading } = useCollection(
    databaseId,
    userCollectionId,
    [Query.notEqual("$id", "global")]
  );

  const data = users
    ? users?.documents
        .map((user: User) => {
          return {
            id: user.$id,
            name: user.name,
            plays: user.stats.reduce(
              (acc, stat) => acc + stat.number_of_plays,
              0
            ),
            unit: "Plays",
          };
        })
        .sort((a, b) => b.plays - a.plays)
        .slice(0, 3)
    : [];

  return <Podium data={data} />;
}
