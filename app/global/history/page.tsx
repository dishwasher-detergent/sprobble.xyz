import { RecentlyPlayed } from "@/components/global/recently-played";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <section className="space-y-6">
      <Header title="Users Play History" subTitle="Global" />
      <RecentlyPlayed />
    </section>
  );
}
