"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface StatsCardProps {
  children: React.ReactElement;
  value?: string | number;
  loading?: boolean;
}

export default function StatsCard({
  children,
  value,
  loading,
}: StatsCardProps) {
  return (
    <Card className="min-w-[20rem] flex-1 bg-slate-100 dark:bg-slate-900 dark:text-white">
      <CardHeader className="px-4 pb-0 pt-2">
        <CardTitle className="flex h-6 flex-row items-center gap-2 text-xs font-medium tracking-tight">
          {children}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-2 pt-0">
        {loading ? (
          <Skeleton className="h-6 w-full bg-slate-200 dark:bg-slate-800" />
        ) : (
          <p className="text-xl font-bold">{value}</p>
        )}
      </CardContent>
    </Card>
  );
}
