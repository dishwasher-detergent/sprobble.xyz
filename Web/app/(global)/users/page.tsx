"use client";

import { TableRowsLoading } from "@/components/loading/table-rows";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/header";
import { Input } from "@/components/ui/input";
import { StatCard } from "@/components/ui/stat-card";
import { StatCardContainer } from "@/components/ui/stat-card-container";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useUsers from "@/hooks/use-users";
import { User } from "@/interfaces/user.interface";
import { database_service } from "@/lib/appwrite";
import { USER_COLLECTION_ID } from "@/lib/constants";
import {
  ColumnFiltersState,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Query } from "appwrite";
import { LucideMusic3 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { COLUMNS, Data } from "./columns";

export default function SongsPage() {
  const { total: users_total, loading: users_loading } = useUsers(
    [Query.notEqual("user_id", "global")],
    true,
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Data[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 12,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const columns = useMemo(() => COLUMNS, []);

  useEffect(() => {
    const fetchData = async () => {
      const { pageSize, pageIndex } = pagination;
      setLoading(true);
      try {
        const response = await database_service.list<User>(USER_COLLECTION_ID, [
          Query.orderAsc("name"),
          Query.select(["name", "$id", "avatar"]),
          Query.notEqual("name", "global"),
          Query.limit(pageSize),
          Query.offset(pageSize * pageIndex),
          ...columnFilters.map((x) => Query.search(x.id, String(x.value))),
        ]);

        const userData: Data[] = response.documents.map((x) => ({
          id: x.$id,
          name: x.name,
          avatar: x.avatar,
        }));

        setData(userData);
        setTotal(response.total);
      } catch (error) {
        throw new Error("Something went wrong!");
      }
      setLoading(false);
    };

    fetchData();
  }, [pagination.pageIndex, pagination.pageSize, columnFilters]);

  const table = useReactTable({
    data,
    columns,
    manualFiltering: true,
    manualPagination: true,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  return (
    <>
      <Header title="Users" sub="Sprobble" className="mb-4 xl:mb-12 xl:pb-36" />
      <StatCardContainer>
        <StatCard
          title="Users"
          stat={users_total}
          icon={<LucideMusic3 className="h-12 w-12" />}
          loading={users_loading}
        />
      </StatCardContainer>
      <section>
        <Input
          placeholder="Filter by Name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="mb-4 max-w-sm"
        />
        <div className="overflow-hidden rounded-xl border bg-background">
          <Table>
            <TableHeader className="bg-slate-100 dark:bg-slate-800">
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
          <div className="flex-1 text-sm text-muted-foreground">
            {total < 5000 ? total : `${total}+`} User(s)
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              disabled={pagination.pageIndex == 0 || loading}
              onClick={() => table.previousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              disabled={data.length < pagination.pageSize || loading}
              onClick={() => table.nextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
