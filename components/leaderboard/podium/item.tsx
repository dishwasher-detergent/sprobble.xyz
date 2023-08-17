"use client";

import { useColor } from "color-thief-react";

interface PodiumItemProps {
  image: string;
  title: string;
  max: number;
  value: number;
  unit?: string;
}

export default function PodiumItem({
  image,
  title,
  max,
  value,
  unit,
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
      <div className="flex-1 overflow-hidden">
        <p className="mb-1 truncate text-lg font-bold">{title}</p>
        <div
          style={{ width: width }}
          className="flex h-8 items-center justify-end rounded-lg bg-foreground px-2 font-bold text-background"
        >
          {value.toLocaleString()} {unit}
        </div>
      </div>
    </div>
  );
}
