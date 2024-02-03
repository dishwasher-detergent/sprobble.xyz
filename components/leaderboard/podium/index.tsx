import { avatarBucketId, projectId } from "@/lib/appwrite";
import PodiumItem from "./item";

interface PodiumProps {
  data: any;
}

export default function Podium({ data }: PodiumProps) {
  return (
    <section
      className="w-full rounded-xl border bg-slate-100 p-4 dark:bg-slate-900 dark:text-white md:w-auto"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, fit-content(1fr))",
        alignItems: "end",
        gap: "1rem",
      }}
    >
      {data.map((item: any, index: number) => (
        <PodiumItem
          key={index}
          image={`${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${avatarBucketId}/files/${item.id}/preview?project=${projectId}`}
          title={item.name}
          value={item.plays}
          unit={item.unit}
          max={data[0].plays}
        />
      ))}
    </section>
  );
}
