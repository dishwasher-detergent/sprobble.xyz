import { ColumnDef } from "@tanstack/react-table";

export interface Data {
  name: string;
}

export const COLUMNS: ColumnDef<Data>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
];
