import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Loader({ className, ...props }: LoaderProps) {
  return (
    <div className={cn("text-blue-600", className)} {...props}>
      <Loader2 className="animate-spin max-h-16 aspect-square" />
      <p className="sr-only">Loading</p>
    </div>
  );
}