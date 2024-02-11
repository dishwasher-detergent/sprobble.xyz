import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Loader({ className, ...props }: LoaderProps) {
  return (
    <div className={cn("text-blue-500", className)} {...props}>
      <Loader2 className="aspect-square max-h-16 animate-spin" />
      <p className="sr-only">Loading</p>
    </div>
  );
}
