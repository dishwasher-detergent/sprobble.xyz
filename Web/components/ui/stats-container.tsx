interface StatsContainerProps {
  weekToWeek: React.ReactNode;
  stats?: React.ReactNode;
}

export function StatsContainer({ weekToWeek, stats }: StatsContainerProps) {
  return (
    <section className="relative z-10 mb-16 mt-4 rounded-[1.75rem] bg-slate-400/10 p-2 dark:bg-slate-50/10 xl:-mt-24">
      {stats ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="h-56 md:col-span-2 md:h-96">{weekToWeek}</div>
          <div className="flex w-full flex-col gap-4">{stats}</div>
        </div>
      ) : (
        <div className="h-56 md:h-96">{weekToWeek}</div>
      )}
    </section>
  );
}
