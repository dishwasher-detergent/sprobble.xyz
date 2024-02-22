interface HistoryContainerProps {
  children: React.ReactNode;
}

export function HistoryContainer({ children }: HistoryContainerProps) {
  return (
    <div className="grid grid-cols-1 gap-4 rounded-[1.75rem] bg-slate-400/10 p-2 dark:bg-slate-50/10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {children}
    </div>
  );
}
