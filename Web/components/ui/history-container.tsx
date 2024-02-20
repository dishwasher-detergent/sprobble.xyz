interface HistoryContainerProps {
  children: React.ReactNode;
}

export function HistoryContainer({ children }: HistoryContainerProps) {
  return (
    <div className="grid grid-cols-1 gap-4 rounded-3xl p-2 bg-slate-900/10 dark:bg-slate-100/10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {children}
    </div>
  );
}
