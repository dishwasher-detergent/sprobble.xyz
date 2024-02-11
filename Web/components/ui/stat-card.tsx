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
    <div className="bg-background flex h-24 w-full flex-row gap-4 rounded-3xl border p-2">
      {icon && (
        <div className="bg-primary-foreground text-primary grid aspect-square h-full flex-nowrap place-items-center rounded-2xl">
          {icon}
        </div>
      )}
      <div>
        <h3 className="text-secondary-foreground text-sm font-semibold">
          {title}
        </h3>
        <p className="text-secondary-foreground text-5xl font-black">{stat}</p>
      </div>
    </div>
  ) : (
    <StatCardLoading />
  );
}
