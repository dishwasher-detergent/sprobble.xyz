"use client";

import { cn, getHSL } from "@/lib/utils";
import { useColor } from "color-thief-react";

interface HeaderProps extends React.AllHTMLAttributes<HTMLDivElement> {
  title: string;
  subTitle?: string;
  description?: string | React.ReactNode;
  listen?: string | React.ReactNode;
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
  description,
  listen,
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
        background: data && getHSL(data, 0.3),
      }}
    >
      {artwork && artwork_name && (
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-slate-300 md:h-64 md:w-64">
          <img
            src={artwork}
            alt={artwork_name}
            sizes="(max-width: 256px) 100vw"
          />
        </div>
      )}
      <div className="flex-1">
        <p className="text-lg font-bold">{subTitle}</p>
        <h2 className="text-5xl font-black dark:text-white md:text-8xl">
          {title}
        </h2>
        <div>{description}</div>
        <p className="absolute bottom-0 right-0">{listen}</p>
      </div>
    </div>
  );
}
