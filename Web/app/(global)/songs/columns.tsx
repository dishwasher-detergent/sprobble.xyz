import { ColumnDef } from "@tanstack/react-table";

export interface SongsData {
  name: string;
}

export const COLUMNS: ColumnDef<SongsData>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
];
