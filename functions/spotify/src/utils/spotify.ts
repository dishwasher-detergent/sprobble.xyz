import { Databases } from "node-appwrite";
import { databaseId, userCollectionId } from "./appwrite.js";

const PLAYER_HISTORY_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`;
const REFRESH_TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

export const checkAuthorization = async (
  database: Databases,
  userId: string
) => {
  const user = await database.getDocument<any>(
    databaseId,
    userCollectionId,
    userId
  );
  return user.authorized;
};

export const getAccessToken = async (
  SPOTIFY_CLIENT_ID: string,
  SPOTIFY_CLIENT_SECRET: string,
  SPOTIFY_REFRESH_TOKEN: string
) => {
  const params = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: SPOTIFY_REFRESH_TOKEN,
  });

  const response = await fetch(REFRESH_TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      authorization: `Basic ${Buffer.from(
        SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET
      ).toString("base64")}`,
    },
    body: params.toString(),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error("Spotify fetcher response was not ok");
  }

  return body;
};

export const getPlayerHistory = async (ACCESS_TOKEN: string) => {
  const date = Date.now() - 1800000;

  const params = new URLSearchParams({
    after: date.toString(),
    limit: "25",
  });

  const response = await fetch(`${PLAYER_HISTORY_ENDPOINT}?${params}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error("Spotify history fetcher response was not ok");
  }

  return body;
};
