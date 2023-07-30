import { Loader } from "@/components/loading/loader";
import { databaseId, userCollectionId } from "@/lib/appwrite";
import { User } from "@/types/Types";
import { Query } from "appwrite";
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
      {isLoading && <Loader />}
      {!isLoading && data?.documents.length == 0 && <p>No results found.</p>}
      <ul className="flex w-full flex-col gap-4">
        {data?.documents.map((user: User) => (
          <li key={user.$id} className="flex w-full flex-row gap-4">
            <div>
              <img
                src={`https://api.dicebear.com/6.x/thumbs/svg?seed=${user.$id}`}
                className="h-16 w-16 rounded-xl"
              />
            </div>
            <div>
              <div className="flex flex-row items-center gap-4">
                <a
                  href={`/user//${user.$id}`}
                  className="truncate text-xl font-bold"
                >
                  {user.name}
                </a>
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
