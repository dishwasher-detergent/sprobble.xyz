import { TotalStat } from "@/interfaces/total-stats.interface";
import {
  ALBUM_COLLECTION_ID,
  ARTIST_COLLECTION_ID,
  DATABASE_ID,
  ENDPOINT,
  PROJECT_ID,
  TOTAL_STATS_COLLECTION_ID,
  TRACK_COLLECTION_ID,
} from "@/lib/constants";
import { Models } from "appwrite";
import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Sprobble";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  const url = `${ENDPOINT}/databases/${DATABASE_ID}/collections/${TOTAL_STATS_COLLECTION_ID}/documents`;
  const data: Models.DocumentList<TotalStat> = await fetch(url, {
    headers: {
      "x-appwrite-project": PROJECT_ID,
    },
  }).then((res) => res.json());

  // Font
  const outfit = fetch(
    new URL("../assets/Outfit-Regular.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer());

  const outfitBold = fetch(
    new URL("../assets/Outfit-Bold.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer());

  const outfitSemibold = fetch(
    new URL("../assets/Outfit-SemiBold.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          background:
            "radial-gradient(93% 93% at 8% 128%,rgba(255, 238, 194, 1) 0%,rgba(255, 238, 194, 0.2) 60%,rgba(194, 233, 255, 0) 100%),radial-gradient(49% 88% at 27% -14%,rgba(92, 107, 237, 0.73) 0%,rgba(93, 227, 236, 0.17) 60%,rgba(93, 227, 236, 0) 100%),radial-gradient(115% 156% at 90% 89%,rgba(147, 101, 240, 1) 0%,rgba(75, 254, 222, 0) 100%),linear-gradient(234deg,rgba(149, 69, 186, 1) 25%,rgba(159, 69, 186, 0.77) 35%,rgba(178, 69, 186, 0.4) 50%,rgba(91, 196, 229, 0) 84%),radial-gradient(119% 119% at 3% 26%,rgba(193, 48, 230, 1) 0%,rgba(48, 158, 230, 0) 74%),linear-gradient(360deg,rgba(242, 245, 250, 1) 0%,rgba(242, 245, 250, 1) 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
          justifyContent: "center",
          margin: 0,
          padding: 0,
          fontFamily: '"Outfit"',
        }}
      >
        <p tw="relative z-10 text-center text-xl font-bold text-primary m-0 p-0">
          Sprobble
        </p>
        <h1 tw="flex flex-col pb-4 text-center text-6xl font-black md:text-7xl lg:text-8xl m-0 p-0">
          The Best Place To Track Your Music
        </h1>
        <div
          style={{
            display: "flex",
            width: "100%",
            gap: "1rem",
            padding: "1rem",
          }}
        >
          <div
            style={{ display: "flex", flex: "1 1 0%", gap: "1rem" }}
            tw="h-24 flex-1 gap-4 rounded-3xl border bg-white p-2"
          >
            <div
              style={{ display: "flex" }}
              tw="items-center justify-center w-20 h-full flex-nowrap rounded-2xl bg-slate-200 text-slate-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="18" r="4" />
                <path d="M16 18V2" />
              </svg>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h3 tw="text-sm font-semibold text-slate-600 m-0 p-0">
                Unique Songs
              </h3>
              <p tw="text-5xl font-black text-slate-900 m-0 p-0">
                {
                  data.documents.filter(
                    (x) => x.title === TRACK_COLLECTION_ID,
                  )[0].count
                }
              </p>
            </div>
          </div>
          <div
            style={{ display: "flex", flex: "1 1 0%", gap: "1rem" }}
            tw="h-24 flex-1 gap-4 rounded-3xl border bg-white p-2"
          >
            <div
              style={{ display: "flex" }}
              tw="items-center justify-center w-20 h-full flex-nowrap rounded-2xl bg-slate-200 text-slate-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M6 12c0-1.7.7-3.2 1.8-4.2" />
                <circle cx="12" cy="12" r="2" />
                <path d="M18 12c0 1.7-.7 3.2-1.8 4.2" />
              </svg>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h3 tw="text-sm font-semibold text-slate-600 m-0 p-0">
                Unique Albums
              </h3>
              <p tw="text-5xl font-black text-slate-900 m-0 p-0">
                {
                  data.documents.filter(
                    (x) => x.title === ALBUM_COLLECTION_ID,
                  )[0].count
                }
              </p>
            </div>
          </div>
          <div
            style={{ display: "flex", flex: "1 1 0%", gap: "1rem" }}
            tw="h-24 flex-1 gap-4 rounded-3xl border bg-white p-2"
          >
            <div
              style={{ display: "flex" }}
              tw="items-center justify-center w-20 h-full flex-nowrap rounded-2xl bg-slate-200 text-slate-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="5" r="1" />
                <path d="m9 20 3-6 3 6" />
                <path d="m6 8 6 2 6-2" />
                <path d="M12 10v4" />
              </svg>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h3 tw="text-sm font-semibold text-slate-600 m-0 p-0">
                Unique Artists
              </h3>
              <p tw="text-5xl font-black text-slate-900 m-0 p-0">
                {
                  data.documents.filter(
                    (x) => x.title === ARTIST_COLLECTION_ID,
                  )[0].count
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Outfit",
          data: await outfit,
          style: "normal",
          weight: 400,
        },
        {
          name: "Outfit",
          data: await outfitSemibold,
          style: "normal",
          weight: 500,
        },
        {
          name: "Outfit",
          data: await outfitBold,
          style: "normal",
          weight: 600,
        },
      ],
    },
  );
}
