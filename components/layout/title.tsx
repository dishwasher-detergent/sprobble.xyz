import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface TitleProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export default function Title({ children, icon, className }: TitleProps) {
  return (
    <h2
      className={cn(
        "flex items-center gap-4 text-base font-bold text-slate-500 dark:text-slate-300",
        className
      )}
    >
      <span className="flex flex-none flex-row items-center gap-2 rounded-lg bg-slate-100 px-4 py-1 dark:bg-slate-900">
        {icon}
        {children}
      </span>
      <Separator className="flex-1" />
    </h2>
  );
}
