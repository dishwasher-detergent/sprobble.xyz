"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { User } from "@/types/Types";
import { getISOWeek } from "date-fns";
import { LucideCalendarDays } from "lucide-react";
import Link from "next/link";
import { useDocument } from "react-appwrite";

interface UserTagProps {
  userId: string;
  hover?: boolean;
}

export default function UserTag({ userId, hover = true }: UserTagProps) {
  const { data: profile } = useDocument<User>(
    "645c032960cb9f95212b",
    "user",
    userId
  );

  const current_week_stats = profile?.stats.filter(
    (x) => x.week_of_year == getISOWeek(new Date())
  )[0];

  const current_week_duration = (
    Number(current_week_stats?.time_spent_listening) /
    1000 /
    60 /
    60
  ).toFixed(2);

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
      {hover && (
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
                  {new Date(profile.created_at).toLocaleDateString("en-us", {
                    month: "long",
                    day: "numeric",
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
      )}
    </HoverCard>
  ) : (
    <p>Loading User.</p>
  );
}
