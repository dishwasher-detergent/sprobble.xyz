"use client";

import { Loader } from "@/components/loading/loader";
import {
  AVATAR_BUCKET_ID,
  DATABASE_ID,
  PROJECT_ID,
  USER_COLLECTION_ID,
} from "@/lib/constants";
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
    DATABASE_ID,
    USER_COLLECTION_ID,
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
              src={`${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${AVATAR_BUCKET_ID}/files/${user.$id}/preview?project=${PROJECT_ID}&width=100&height=100&quality=60`}
              className="h-16 w-16 flex-none rounded-xl"
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
