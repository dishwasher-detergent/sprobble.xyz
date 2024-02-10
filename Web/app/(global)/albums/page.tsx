"use client";

import { TableRowsLoading } from "@/components/loading/table-rows";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Track } from "@/interfaces/track.interface";
import { database_service } from "@/lib/appwrite";
import { ALBUM_COLLECTION_ID } from "@/lib/constants";
import {
  PaginationState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Query } from "appwrite";
import { useEffect, useMemo, useState } from "react";
import { COLUMNS, Data } from "./columns";

export default function AlbumsPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Data[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 12,
  });
  const columns = useMemo(() => COLUMNS, []);

  useEffect(() => {
    const fetchData = async () => {
      const { pageSize, pageIndex } = pagination;
      setLoading(true);
      try {
        const response = await database_service.list<Track>(
          ALBUM_COLLECTION_ID,
          [
            Query.select(["name"]),
            Query.limit(pageSize),
            Query.offset(pageSize * pageIndex),
          ],
        );

        const songsData: Data[] = response.documents.map((x) => ({
          name: x.name,
        }));

        setData(songsData);
        setTotal(response.total);
      } catch (error) {
        throw new Error("Something went wrong!");
      }
      setLoading(false);
    };

    fetchData();
  }, [pagination.pageIndex, pagination.pageSize]);

  const table = useReactTable({
    data,
    columns,
    manualFiltering: true,
    manualPagination: true,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : !loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            ) : (
              <TableRowsLoading
                rows={pagination.pageSize}
                columns={columns.length}
              />
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {total < 5000 ? total : `${total}+`} Document(s)
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            disabled={pagination.pageIndex == 0 || loading}
            onClick={() => table.previousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={data.length < pagination.pageSize || loading}
            onClick={() => table.nextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
