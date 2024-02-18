import { StatCardLoading } from "@/components/loading/stat-card";

interface StatCardProps {
  title: string;
  stat?: string | number;
  icon?: React.ReactNode;
  loading?: boolean;
}

export function StatCard({
  title,
  stat,
  icon,
  loading = false,
}: StatCardProps) {
  return !loading ? (
    <div className="flex h-24 w-full flex-row gap-4 rounded-3xl border bg-background p-2">
      {icon && (
        <div className="grid aspect-square h-full flex-nowrap place-items-center rounded-2xl bg-primary-foreground text-primary dark:bg-primary dark:text-primary-foreground">
          {icon}
        </div>
      )}
      <div>
        <h3 className="text-sm font-semibold text-secondary-foreground">
          {title}
        </h3>
        <p className="text-5xl font-black text-secondary-foreground">{stat}</p>
      </div>
    </div>
  ) : (
    <StatCardLoading />
  );
}
