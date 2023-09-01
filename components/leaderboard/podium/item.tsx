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
          className="aspect-square h-full rounded-xl "
        />
      </div>
      <div className="flex-1 overflow-hidden">
        <p className="mb-1 truncate text-lg font-bold">{title}</p>
        <div className="flex flex-row">
          <div className="flex w-24 flex-none items-center justify-start rounded-l-lg bg-foreground px-2 text-background md:w-36">
            <p className="truncate">
              {value.toLocaleString()} {unit}
            </p>
          </div>
          <div
            style={{ width: width }}
            className="flex h-8 items-center justify-end rounded-r-lg bg-foreground px-2 font-bold text-background"
          />
        </div>
      </div>
    </div>
  );
}
