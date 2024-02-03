import {
  avatarBucketId,
  databaseId,
  projectId,
  userCollectionId,
} from "@/lib/appwrite";
import { User } from "@/types/Types";
import { Models } from "appwrite";
import { ImageResponse } from "next/server";

export const runtime = "edge";

const fetchUser = async (id: string) => {
  const user: Models.Document & User = await fetch(
    `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/databases/${databaseId}/collections/${userCollectionId}/documents/${id}`,
    {
      headers: {
        "X-Appwrite-Project": process.env
          .NEXT_PUBLIC_APPWRITE_PROJECT_ID as string,
      },
    }
  ).then((res) => res.json());

  return user;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return new ImageResponse(<>Missing id param.</>, {
      width: 1080,
      height: 1080,
    });
  }

  const fontData = await fetch(
    new URL("../../../../assets/Cabin-Regular.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const user = await fetchUser(id);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          color: "#020617",
          width: "100%",
          height: "100%",
          paddingTop: 50,
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          padding: "10px",
          margin: 0,
          backgroundColor: "#020617",
          fontFamily: '"Cabin"',
          position: "relative",
        }}
      >
        <img
          width="100%"
          height="100%"
          src={`${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${avatarBucketId}/files/${id}/preview?project=${projectId}&width=800&height=800&quality=100`}
          style={{
            borderRadius: 16,
            objectFit: "cover",
            objectPosition: "top left",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            bottom: 16,
            left: 16,
            right: 16,
            padding: 20,
            backgroundColor: "rgba(2, 6, 23, .65)",
            borderRadius: 16,
          }}
        >
          <h1
            style={{
              margin: 0,
              padding: 0,
              width: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: 156,
              fontWeight: 900,
              color: "#ffffff",
            }}
          >
            {user.name}
          </h1>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              gap: 10,
              color: "#ffffff",
            }}
          >
            <p
              style={{
                fontSize: 32,
                margin: 0,
                padding: "24px 48px",
                borderRadius: 9999,
                backgroundColor: "#020617",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {user.stats
                .reduce((acc, stat) => acc + stat.number_of_plays, 0)
                .toLocaleString()}{" "}
              Tracks Played
            </p>
            <p
              style={{
                fontSize: 32,
                margin: 0,
                padding: "24px 48px",
                borderRadius: 9999,
                backgroundColor: "#020617",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {(
                user.stats.reduce(
                  (acc, stat) => acc + Number(stat.time_spent_listening),
                  0
                ) /
                1000 /
                60 /
                60
              ).toFixed(2)}{" "}
              Hours Listened
            </p>
          </div>
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1080,
      fonts: [
        {
          name: "Cabin",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}
