"use client";

import Song from "@/components/Song";
import { spotify } from "@/spotify";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-24">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
        {spotify.items.map((item) => (
          <Song content={item} key={item.id} />
        ))}
      </div>
    </main>
  );
}
