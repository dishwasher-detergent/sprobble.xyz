"use client";

import { cn, getHSL } from "@/lib/utils";
import { useColor } from "color-thief-react";
import Image from "next/image";

interface HeaderProps extends React.AllHTMLAttributes<HTMLDivElement> {
  title: string;
  subTitle?: string;
  artwork?: string;
  artwork_name?: string;
  className?: string;
}

export function Header({
  className,
  artwork,
  artwork_name,
  title,
  subTitle,
  ...props
}: HeaderProps) {
  const { data } = useColor(artwork ?? "", "hslString", {
    crossOrigin: "Anonymous",
  });

  return (
    <div
      className={cn(
        "relative flex flex-col gap-6 rounded-lg p-2 md:flex-row",
        className
      )}
      {...props}
      style={{
        background:
          data &&
          `radial-gradient(circle farthest-corner at top left, ${getHSL(
            data,
            0.3
          )} 0%, transparent 50%)`,
      }}
    >
      {artwork && artwork_name && (
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-slate-300 md:h-64 md:w-64">
          <Image src={artwork} fill alt={artwork_name} />
        </div>
      )}
      <div className="flex-1">
        <p className="text-lg font-bold">{subTitle}</p>
        <h2 className="text-3xl font-black dark:text-white md:text-8xl">
          {title}
        </h2>
      </div>
    </div>
  );
}
