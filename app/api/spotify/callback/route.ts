import axios from "axios";
import { NextResponse } from "next/server";
import QueryString from "query-string";

const REFRESH_TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

export async function POST(request: Request) {
  const req = await request.json();

  if (!req.code) {
    return NextResponse.json({ message: "No code provided" });
  }

  const response = await axios
    .post(
      REFRESH_TOKEN_ENDPOINT,
      QueryString.stringify({
        code: req.code,
        redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URL,
        grant_type: "authorization_code",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
          ).toString("base64")}`,
        },
      }
    )
    .then(
      (res) => {
        return res.data;
      },
      (err) => err
    );

  return NextResponse.json(response);
}
