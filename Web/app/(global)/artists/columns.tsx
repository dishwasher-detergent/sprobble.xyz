import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export interface Data {
  id: string;
  name: string;
  number_of_albums: number;
  number_of_songs: number;
  number_of_plays: number;
}

export const COLUMNS: ColumnDef<Data>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell(props) {
      return (
        <Link href={`/artists/${props.row.original.id}`}>
          {props.row.original.name}
        </Link>
      );
    },
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
