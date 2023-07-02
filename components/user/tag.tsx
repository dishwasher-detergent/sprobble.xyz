"use client";

import { User } from "@/types/Types";
import { getISOWeek } from "date-fns";
import { LucideCalendarDays } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useAppwrite } from "react-appwrite";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

interface UserTagProps {
  userId: string;
}

export default function UserTag({ userId }: UserTagProps) {
  const [profile, setProfile] = useState<User>();
  const { databases } = useAppwrite();

  useEffect(() => {
    databases
      .getDocument<User>("645c032960cb9f95212b", "user", userId)
      .then((response) => {
        setProfile(response);
      })
      .catch(() => {
        setProfile(undefined);
      });
  }, []);

  const current_week_stats = useMemo(
    () =>
      profile?.stats.filter((x) => x.week_of_year == getISOWeek(new Date()))[0],
    [profile]
  );

  const current_week_duration = useMemo(
    () =>
      (
        Number(current_week_stats?.time_spent_listening) /
        1000 /
        60 /
        60
      ).toFixed(2),
    [current_week_stats]
  );

  return profile ? (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link href={`/user/${userId}`} className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage
              src={`https://api.dicebear.com/6.x/thumbs/svg?seed=${userId}`}
              alt={`@${profile.name}`}
            />
            <AvatarFallback>{profile.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <span className="text-base font-semibold">{profile.name}</span>
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex space-x-4">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={`https://api.dicebear.com/6.x/thumbs/svg?seed=${userId}`}
              alt={`@${profile.name}`}
            />
            <AvatarFallback>{profile.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="w-full">
            <h4 className="pb-2 text-base font-semibold">
              <Link href={`/user/${userId}`}>{profile.name}</Link>
            </h4>
            <div className="mb-2 flex items-center border-b pb-2">
              <LucideCalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined{" "}
                {new Date().toLocaleDateString("en-us", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold">This weeks Sprobbles</p>
              <p className="text-sm">
                {current_week_stats?.number_of_plays} Sprobbles
              </p>
              <p className="text-sm">{current_week_duration} Hours Played</p>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ) : (
    <p>Loading User.</p>
  );
}
