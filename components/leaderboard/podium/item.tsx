"use client";

import { Card } from "@/components/ui/card";
import { getHSL } from "@/lib/utils";
import { useColor } from "color-thief-react";
import { LucideTrophy } from "lucide-react";

interface PodiumItemProps {
  image: string;
  title: string;
  position: number;
}

export default function PodiumItem({
  image,
  title,
  position,
}: PodiumItemProps) {
  const { data } = useColor(image, "hslString", {
    crossOrigin: "Anonymous",
  });

  return (
    <Card
      className="flex w-full gap-4 rounded-lg border-none p-2 text-slate-900 dark:text-white md:block md:w-48"
      style={{
        background:
          data &&
          `radial-gradient(circle farthest-corner at top left, ${getHSL(
            data,
            0.6
          )} 0%, transparent 70%)`,
      }}
    >
      <div className="relative aspect-square w-24 overflow-hidden rounded-lg md:w-full">
        <img
          alt={title}
          src={image}
          className="absolute inset-0 h-full w-full flex-none object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col items-start gap-2 overflow-hidden pb-6 pt-2 md:flex-row md:items-center">
        <p className="truncate text-3xl font-bold">{title}</p>
        <span className="block p-1">
          {position == 0 && (
            <LucideTrophy className="h-6 w-6 text-yellow-300" />
          )}
          {position == 1 && <LucideTrophy className="h-6 w-6 text-slate-300" />}
          {position == 2 && <LucideTrophy className="h-6 w-6 text-amber-600" />}
        </span>
      </div>
    </Card>
  );
}
