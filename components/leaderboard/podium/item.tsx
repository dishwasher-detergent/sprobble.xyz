"use client";

import { useColor } from "color-thief-react";

interface PodiumItemProps {
  image: string;
  title: string;
  max: number;
  value: number;
}

export default function PodiumItem({
  image,
  title,
  max,
  value,
}: PodiumItemProps) {
  const { data } = useColor(image, "hslString", {
    crossOrigin: "Anonymous",
  });

  let width = `${(value / max) * 100}%`;

  return (
    <div className="flex h-16 flex-row gap-2">
      <div className="h-full flex-none">
        <img
          src={image}
          alt={title}
          className="aspect-square h-full rounded-lg "
        />
      </div>
      <div className="w-24 flex-none overflow-hidden">
        <p className="truncate font-bold">{title}</p>
        <p className="truncate">{value.toLocaleString()} Plays</p>
      </div>
      <div style={{ width: width }} className="rounded-lg bg-foreground" />
    </div>
  );
}
