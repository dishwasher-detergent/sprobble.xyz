import { ColumnDef } from "@tanstack/react-table";

export interface Data {
  name: string;
  number_of_albums: number;
  number_of_songs: number;
  number_of_plays: number;
}

export const COLUMNS: ColumnDef<Data>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "number_of_songs",
    header: "Songs",
  },
  {
    accessorKey: "number_of_albums",
    header: "Albums",
  },
  {
    accessorKey: "number_of_plays",
    header: "Plays",
  },
];
