"use client";

import { Query } from "appwrite";
import { useEffect, useState } from "react";
import { useAppwrite } from "react-appwrite";

interface UserTagProps {
  userId: string;
}

export default function UserTag({ userId }: UserTagProps) {
  const [username, setUsername] = useState("");
  const { databases } = useAppwrite();

  useEffect(() => {
    databases
      .listDocuments("645c032960cb9f95212b", "user", [
        Query.equal("user_id", userId),
      ])
      .then((response) => {
        setUsername(response.documents[0].name);
      })
      .catch(() => {
        setUsername(userId);
      });
  }, []);

  return (
    <div className="flex items-center gap-2">
      <img
        src={`https://api.dicebear.com/6.x/thumbs/svg?seed=${userId}`}
        className="h-6 w-6 rounded-full"
      />
      <span className="text-base font-semibold">{username}</span>
    </div>
  );
}
