import { LucideFlame } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  TooltipTrigger,
  TooltipProvider,
  TooltipContent,
  Tooltip,
} from "@/components/ui/tooltip";

interface PopularityProps {
  className?: string;
  popularity?: number;
}

export default function Popularity({
  className,
  popularity = 0,
}: PopularityProps) {
  const popCalc = (popularity - 80) * 3;

  if (popularity < 70) return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "bg-amber-500 aspect-square text-white rounded-full grid place-items-center p-1",
              className
            )}
            style={{
              width: `${popCalc > 25 ? popCalc : 25}px`,
              height: `${popCalc > 25 ? popCalc : 25}px`,
            }}
          >
            <LucideFlame
              style={{
                width: `${(popCalc > 25 ? popCalc : 25) - 10}px`,
                height: `${(popCalc > 25 ? popCalc : 25) - 10}px`,
              }}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            Top <span className="font-bold">{popularity}%</span>.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
