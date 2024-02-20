interface StatCardContainerProps {
  children: React.ReactNode;
}

export function StatCardContainer({ children }: StatCardContainerProps) {
  return (
    <section className="relative z-10 grid grid-cols-1 gap-4 pb-4 md:grid-cols-2 xl:-mt-24 xl:grid-cols-3 xl:pb-16">
      {children}
    </section>
  );
}
