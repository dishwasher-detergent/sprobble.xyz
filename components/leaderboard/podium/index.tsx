import { avatarBucketId, projectId } from "@/lib/appwrite";
import PodiumItem from "./item";

interface PodiumProps {
  data: any;
}

export default function Podium({ data }: PodiumProps) {
  return (
    <section className="flex flex-col gap-4 md:flex-row">
      {data.map((item: any, index: number) => (
        <PodiumItem
          key={index}
          image={`https://data.kennethbass.com/v1/storage/buckets/${avatarBucketId}/files/${item.id}/preview?project=${projectId}`}
          title={item.name}
          position={index}
        />
      ))}
    </section>
  );
}
