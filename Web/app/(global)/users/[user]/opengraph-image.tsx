import { Stat } from "@/interfaces/stats.interface";
import { User } from "@/interfaces/user.interface";
import {
  AVATARS_BUCKET_ID,
  DATABASE_ID,
  ENDPOINT,
  PROJECT_ID,
  STATS_COLLECTION_ID,
  USER_COLLECTION_ID,
} from "@/lib/constants";
import { combineAndSumPlays } from "@/lib/utils";
import { Models } from "appwrite";
import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Sprobble - User Statistics";
export const size = {
  width: 640,
  height: 640,
};

export const contentType = "image/png";

// Image generation
export default async function Image({ params }: { params: { user: string } }) {
  const { user: id } = params;

  const userUrl = `${ENDPOINT}/databases/${DATABASE_ID}/collections/${USER_COLLECTION_ID}/documents/${id}`;
  const user: User = await fetch(userUrl, {
    headers: {
      "x-appwrite-project": PROJECT_ID,
    },
  }).then((res) => res.json());

  const url = `${ENDPOINT}/databases/${DATABASE_ID}/collections/${STATS_COLLECTION_ID}/documents?queries[]=equal("user_id", ["${id}"])&queries[]=select(["number_of_plays","user_id","time_spent_listening","week_of_year"])`;
  const data: Models.DocumentList<Stat> = await fetch(url, {
    headers: {
      "x-appwrite-project": PROJECT_ID,
    },
  }).then((res) => res.json());

  const weekToWeekFormatted = combineAndSumPlays(data.documents).map(
    (stat) => ({
      name: `Week ${stat.week_of_year}`,
      plays: stat.number_of_plays,
      duration: (Number(stat.time_spent_listening) / 1000 / 60 / 60).toFixed(2),
    }),
  );

  // Font
  const outfit = fetch(
    new URL("../../../../assets/Outfit-Regular.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer());

  const outfitBold = fetch(
    new URL("../../../../assets/Outfit-Bold.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer());

  const outfitSemibold = fetch(
    new URL("../../../../assets/Outfit-SemiBold.ttf", import.meta.url),
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
        <div
          style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          tw="flex-1 items-center justify-center"
        >
          <div
            style={{ display: "flex" }}
            tw="items-center justify-center h-36 w-36 rounded-full overflow-hidden"
          >
            <img
              tw="h-full w-full object-cover"
              src={`${ENDPOINT}/storage/buckets/${AVATARS_BUCKET_ID}/files/${user.avatar}/view?project=${PROJECT_ID}`}
            />
          </div>
          <h1 tw="flex flex-col text-center text-5xl font-black m-0 p-0 flex-none truncate">
            {user.name}
          </h1>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: "1rem",
            padding: "1rem",
          }}
        >
          <div
            style={{ display: "flex", gap: "1rem" }}
            tw="h-26 flex-1 rounded-3xl border bg-white p-2 flex-none"
          >
            <div
              style={{ display: "flex" }}
              tw="items-center justify-center w-20 h-full flex-nowrap rounded-2xl bg-slate-100 text-slate-900"
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
              <h3 tw="font-semibold text-slate-600 m-0 p-0">Total Sprobbles</h3>
              <p tw="text-5xl font-black text-slate-900 m-0 p-0">
                {weekToWeekFormatted
                  ?.reduce((a: any, b: any) => a + b.plays, 0)
                  .toLocaleString() + " Sprobbles"}
              </p>
            </div>
          </div>
          <div
            style={{ display: "flex", gap: "1rem" }}
            tw="h-26 flex-1 rounded-3xl border bg-white p-2 flex-none"
          >
            <div
              style={{ display: "flex" }}
              tw="items-center justify-center w-20 h-full flex-nowrap rounded-2xl bg-slate-100 text-slate-900"
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
                <line x1="10" x2="14" y1="2" y2="2" />
                <line x1="12" x2="15" y1="14" y2="11" />
                <circle cx="12" cy="14" r="8" />
              </svg>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h3 tw="font-semibold text-slate-600 m-0 p-0">Total Hours</h3>
              <p tw="text-5xl font-black text-slate-900 m-0 p-0">
                {weekToWeekFormatted
                  ?.reduce((a: any, b: any) => a + Number(b.duration), 0)
                  .toLocaleString() + " Hours"}
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
