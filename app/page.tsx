import Display from "#/ui/display";
import { Nunito } from "@next/font/google";
import fs from "fs";
import { join } from "path";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--nunito-font",
});

const basePath = join(process.cwd(), "data");

export type StreamData = {
  endTime: string;
  artistName: string;
  trackName: string;
  msPlayed: number;
};

export type Artist = {
  artist: {
    name: string;
    count: number;
    msPlayed: number;
  };
  song: {
    [key: string]: {
      name: string;
      count: number;
      msPlayed: number;
    };
  };
};

type Counts = {
  [key: string]: Artist;
};

async function getData(year: number) {
  const streamData: StreamData[] = [];
  const counts: Counts = {};
  const files = fs.readdirSync(basePath, { withFileTypes: true });

  files.forEach((file) => {
    const data = JSON.parse(
      fs.readFileSync(join(basePath, file.name), "utf-8")
    );
    streamData.push(...data);
  });

  const currentYearData = streamData.filter((item) => {
    const date = new Date(item.endTime);
    return date.getFullYear() === year;
  });

  currentYearData.forEach((item) => {
    if (counts[item.artistName]) {
      counts[item.artistName].artist.count += 1;
      counts[item.artistName].artist.msPlayed += item.msPlayed;
      if (counts[item.artistName].song[item.trackName]) {
        counts[item.artistName].song[item.trackName].count += 1;
        counts[item.artistName].song[item.trackName].msPlayed += item.msPlayed;
      } else {
        counts[item.artistName].song[item.trackName] = {
          name: item.trackName,
          count: 1,
          msPlayed: item.msPlayed,
        };
      }
    } else {
      counts[item.artistName] = {
        artist: {
          name: item.artistName,
          count: 1,
          msPlayed: item.msPlayed,
        },
        song: {
          [item.trackName]: {
            name: item.trackName,
            count: 1,
            msPlayed: item.msPlayed,
          },
        },
      };
    }
  });

  const countsArray: Artist[] = Object.values(counts);

  return countsArray;
}

export default async function Home() {
  const files = await getData(2022);

  return (
    <main className="mx-auto w-full max-w-7xl h-full p-8">
      <h1 className={`${nunito.variable} font-bold text-3xl pb-4`}>
        Stats for Spotify Data Dump
      </h1>
      <Display files={files} />
    </main>
  );
}
