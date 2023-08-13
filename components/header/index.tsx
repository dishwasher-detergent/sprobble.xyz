"use client";

import { cn, getHSL } from "@/lib/utils";
import { usePalette } from "color-thief-react";

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
    <div className={cn("relative", className)} {...props}>
      {artwork ? (
        <>
          <div
            className="h-36 w-full rounded-lg md:h-52"
            style={{
              background:
                data &&
                `linear-gradient(45deg, ${getHSL(data[0], 1)} 0%, ${getHSL(
                  data[1],
                  1
                )} 100%)`,
            }}
          />
          <div className="-mt-24 ml-8 md:-mt-36 md:ml-16">
            <div className="relative aspect-square h-32 w-32 overflow-hidden rounded-lg bg-slate-300 ring-4 ring-background md:h-60 md:w-60">
              <img
                src={artwork}
                alt={artwork_name}
                sizes="(max-width: 256px) 100vw"
              />
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
        </>
      ) : (
        <div className="to-teal-300-300 flex-1 rounded-lg border bg-gradient-to-tr from-blue-500 to-blue-600 p-4 dark:bg-slate-900 md:p-8">
          <h2 className="text-3xl font-black text-white dark:text-white md:text-6xl">
            {title}
          </h2>
          <p className="pb-2 text-white">{subTitle}</p>
          <div>{description}</div>
          <p>{listen}</p>
        </div>
      )}
    </div>
  );
}
