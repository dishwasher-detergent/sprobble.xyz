import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export interface Data {
  images: string[];
  id: string;
  name: string;
  number_of_plays: number;
  album_name: string;
  album_id: string;
  artist: {
    id: string;
    name: string;
  }[];
}

export const COLUMNS: ColumnDef<Data>[] = [
  {
    accessorKey: "images",
    header: "Artwork",
    cell(props) {
      return (
        <Avatar className="block h-14 w-14 flex-none overflow-hidden rounded-xl">
          <AvatarImage
            src={props.row.original.images[0]}
            alt={props.row.original.name}
          />
        </Avatar>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell(props) {
      return (
        <Link href={`/songs/${props.row.original.id}`}>
          {props.row.original.name}
        </Link>
      );
    },
  },
  {
    accessorKey: "album_name",
    header: "Album",
    cell(props) {
      return (
        <Link href={`/albums/${props.row.original.album_id}`}>
          {props.row.original.album_name}
        </Link>
      );
    },
  },
  {
    accessorKey: "artist_name",
    header: "Artist",
    cell(props) {
      return props.row.original.artist.map((x, index) => (
        <Link key={index} href={`/artists/${x.id}`}>
          {index > 0 && ", "}
          {x.name}
        </Link>
      ));
    },
  },
  {
    accessorKey: "number_of_plays",
    header: "Plays",
  },
];
