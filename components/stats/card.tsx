"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface StatsCardProps {
  children: React.ReactNode;
  title: string | number | undefined;
  icon?: React.ReactNode;
  loading?: boolean;
}

export default function StatsCard({
  children,
  title,
  icon,
  loading,
}: StatsCardProps) {
  return (
    <Card className="min-w-[20rem] flex-1">
      <CardHeader className="px-4 pb-0 pt-2">
        <CardTitle className="flex h-6 flex-row items-center gap-4 text-xs font-medium tracking-tight">
          {title} {icon}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-2 pt-0">
        {loading ? (
          <Skeleton className="h-6 w-full bg-slate-200 dark:bg-slate-800" />
        ) : (
          <div className="text-xl font-bold">{children}</div>
        )}
      </CardContent>
    </Card>
  );
}
