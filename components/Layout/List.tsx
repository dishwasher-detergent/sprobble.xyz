import { Play } from "@/types/Types";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { LucideExternalLink } from "lucide-react";

interface ListProps {
  plays: Play[];
}

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "album_art",
    header: "Album Cover",
    cell(props) {
      return (
        <div className="aspect-square h-10 rounded-lg bg-slate-900 relative overflow-hidden flex-none">
          <Image
            src={props.row.original.album_art}
            alt={props.row.original.album_art}
            fill={true}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell(props) {
      return (
        <a
          href={props.row.original.url}
          target="_blank"
          rel="noreferrer"
          className="hover:text-blue-600 flex flex-row gap-2 items-center"
        >
          {props.row.original.name}
          <LucideExternalLink size={16} />
        </a>
      );
    },
  },
  {
    accessorKey: "played_at",
    header: "Played At",
  },
  {
    accessorKey: "plays",
    header: "Plays",
  },
];

export default function List({ plays }: ListProps) {
  const data = plays.map((play: Play) => ({
    album_art: play.track[0].album[0].images[0],
    name: play.track[0].name,
    url: play.track[0].href,
    played_at: new Date(play.played_at).toLocaleString(),
    plays: 0,
  }));

  return <DataTable columns={columns} data={data} />;
}
