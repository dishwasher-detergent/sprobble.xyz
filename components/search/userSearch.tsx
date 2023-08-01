"use client";

import { Loader } from "@/components/loading/loader";
import { databaseId, userCollectionId } from "@/lib/appwrite";
import { User } from "@/types/Types";
import { Query } from "appwrite";
import Link from "next/link";
import { useCollection } from "react-appwrite";

export default function UserSearch({
  params,
}: {
  params: { search: string[] };
}) {
  const { data, isLoading } = useCollection<User>(
    databaseId,
    userCollectionId,
    [Query.startsWith("name", params.search[1])]
  );

  return (
    <section>
      {isLoading && <Loader className="grid w-full place-items-center" />}
      {!isLoading && data?.documents.length == 0 && <p>No results found.</p>}
      <ul className="flex w-full flex-col gap-4">
        {data?.documents.map((user: User) => (
          <li key={user.$id} className="flex w-full flex-row gap-4">
            <img
              src={`https://api.dicebear.com/6.x/thumbs/svg?seed=${user.$id}`}
              className="h-16 w-16 flex-none rounded-lg"
            />
            <div className="overflow-hidden">
              <div className="flex flex-row items-center gap-4">
                <Link
                  href={`/user/${user.$id}`}
                  className="truncate text-xl font-bold hover:text-blue-500"
                >
                  {user.name}
                </Link>
              </div>
              <p>
                Joined{" "}
                {new Date(user.created_at).toLocaleDateString("en-us", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
