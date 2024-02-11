import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AVATARS_BUCKET_ID, ENDPOINT, PROJECT_ID } from "@/lib/constants";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export interface Data {
  id: string;
  name: string;
  avatar: string;
}

export const COLUMNS: ColumnDef<Data>[] = [
  {
    accessorKey: "images",
    header: "Artwork",
    cell(props) {
      return (
        <Avatar className="block h-14 w-14 flex-none overflow-hidden rounded-xl">
          <AvatarImage
            src={`${ENDPOINT}/storage/buckets/${AVATARS_BUCKET_ID}/files/${props.row.original.avatar}/view?project=${PROJECT_ID}`}
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
        <Link href={`/users/${props.row.original.id}`}>
          {props.row.original.name}
        </Link>
      );
    },
  },
];
