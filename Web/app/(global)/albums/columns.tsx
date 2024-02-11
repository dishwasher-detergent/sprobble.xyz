import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";

export interface Data {
  images: string[];
  name: string;
  number_of_plays: number;
  number_of_songs: number;
  artist_name: string[];
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
  },
  {
    accessorKey: "artist_name",
    header: "Artist",
    cell(props) {
      return props.row.original.artist_name.map((x, index) => (
        <a key={index}>
          {index > 0 && ", "}
          {x}
        </a>
      ));
    },
  },
  {
    accessorKey: "number_of_songs",
    header: "Songs",
  },
  {
    accessorKey: "number_of_plays",
    header: "Plays",
  },
];
