import { MusicCardLoading } from "@/components/loading/music-card";
import { StatCardLoading } from "@/components/loading/stat.card";

export default function HomeLoading() {
  return (
    <>
      <section className="pb-4">
        <h1 className="text-center text-4xl font-black">Track your Music</h1>
      </section>
      <section className="grid grid-cols-1 gap-4 pb-4 md:grid-cols-3">
        <div className="min-h-24 rounded-3xl border md:col-span-2"></div>
        <div className="flex w-full flex-col gap-4">
          <StatCardLoading />
          <StatCardLoading />
          <StatCardLoading />
        </div>
      </section>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(10)].map((x, index) => (
          <MusicCardLoading key={index} />
        ))}
      </section>
    </>
  );
}
