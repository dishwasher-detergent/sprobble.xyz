interface StatCardProps {
  title: string;
  stat: string | number;
  icon?: React.ReactNode;
}

export function StatCard({ title, stat, icon }: StatCardProps) {
  return (
    <div className="flex h-24 w-full flex-row gap-2 rounded-3xl border p-2">
      {icon && (
        <div className="grid aspect-square h-full flex-nowrap place-items-center rounded-2xl bg-slate-100 text-slate-800">
          {icon}
        </div>
      )}
      <div>
        <h3 className="text-sm font-semibold text-slate-600">{title}</h3>
        <p className="text-primary text-5xl font-black">{stat}</p>
      </div>
    </div>
  );
}
