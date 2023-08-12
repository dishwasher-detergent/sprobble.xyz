import { avatarBucketId, projectId } from "@/lib/appwrite";
import PodiumItem from "./item";

interface PodiumProps {
  data: any;
}

export default function Podium({ data }: PodiumProps) {
  return (
    <section className="flex flex-col items-end justify-start gap-4 md:flex-row">
      <div
        className="w-full rounded-lg border bg-slate-100 p-4 dark:bg-slate-900 dark:text-white md:w-auto"
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
            image={`https://data.kennethbass.com/v1/storage/buckets/${avatarBucketId}/files/${item.id}/preview?project=${projectId}`}
            title={item.name}
            position={index}
          />
        ))}
      </div>
    </section>
  );
}
