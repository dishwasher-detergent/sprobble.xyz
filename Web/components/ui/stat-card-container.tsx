interface StatCardContainerProps {
  children: React.ReactNode;
}

export function StatCardContainer({ children }: StatCardContainerProps) {
  return (
    <section className="relative z-10 grid grid-cols-1 gap-4 p-2 mb-4 md:grid-cols-2 xl:-mt-24 xl:grid-cols-3 xl:mb-16 bg-slate-900/10 dark:bg-slate-100/10 rounded-3xl">
      {children}
    </section>
  );
}
