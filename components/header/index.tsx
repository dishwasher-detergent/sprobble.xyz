"use client";

import { cn, getHSL } from "@/lib/utils";
import { usePalette } from "color-thief-react";
import { Card } from "../ui/card";

interface HeaderProps extends React.AllHTMLAttributes<HTMLDivElement> {
  title: string;
  subTitle?: string | React.ReactNode;
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
  const { data } = usePalette(artwork ?? "", 2, "hslString", {
    crossOrigin: "Anonymous",
  });

  return (
    <div>
      {artwork ? (
        <Card className={cn("relative overflow-hidden", className)} {...props}>
          <div
            className="h-36 w-full md:h-52"
            style={{
              background:
                data &&
                `linear-gradient(45deg, ${getHSL(data[0], 1)} 0%, ${getHSL(
                  data[1],
                  1
                )} 100%)`,
            }}
          />
          <div className="-mt-24 ml-8 pb-8 md:-mt-36">
            <div className="relative aspect-square h-32 w-32 overflow-hidden rounded-full bg-slate-300 ring-4 ring-background md:h-60 md:w-60">
              <img src={artwork} alt={artwork_name} className="h-full w-full" />
            </div>
            <div className="mt-2 flex-1">
              <h2 className="text-xl font-black dark:text-white md:text-3xl">
                {title}
              </h2>
              <p>{subTitle}</p>
              <div>{description}</div>
              <p>{listen}</p>
            </div>
          </div>
        </Card>
      ) : (
        <div className="py-6">
          <p className="pb-2">{subTitle}</p>
          <h2 className="text-4xl font-black dark:text-white md:text-6xl lg:text-8xl">
            {title}
          </h2>
          <div>{description}</div>
          <p>{listen}</p>
        </div>
      )}
    </div>
  );
}
