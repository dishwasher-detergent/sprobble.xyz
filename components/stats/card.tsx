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
    <Card className="min-w-[20rem] flex-1">
      <CardHeader>
        <CardTitle className="flex h-6 flex-row items-center gap-2 text-sm font-medium tracking-tight">
          {children}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-10 w-full" />
        ) : (
          <p className="text-4xl font-bold">{value}</p>
        )}
      </CardContent>
    </Card>
  );
}
