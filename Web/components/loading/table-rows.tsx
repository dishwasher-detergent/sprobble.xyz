import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

interface TableRowsLoadingProps {
  rows: number;
  columns: number;
}

export function TableRowsLoading({
  rows = 12,
  columns = 1,
}: TableRowsLoadingProps) {
  return [...Array(rows)].map((x, index) => (
    <TableRow key={index}>
      {[...Array(columns)].map((y, index) => (
        <TableCell key={index}>
          <Skeleton className="h-5" />
        </TableCell>
      ))}
    </TableRow>
  ));
}
