const SEVERAL_ALBUMS_ENDPOINT = `https://api.spotify.com/v1/albums`;
const REFRESH_TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

const getAccessToken = async (
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REFRESH_TOKEN
) => {
  console.log("Fetching access token.");

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
    console.log("Spotify fetcher response was not ok", response.status);
    console.log(body);
    return;
  }

  return body;
};

const getAlbumsFromSpotify = async (ACCESS_TOKEN, albumIds) => {
  const params = new URLSearchParams({
    ids: albumIds,
  });

  const response = await fetch(`${SEVERAL_ALBUMS_ENDPOINT}?${params}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });

  const body = await response.json();
  if (!response.ok) {
    console.log("Spotify fetcher response was not ok", response.status);
    console.log(body);
    return;
  }

  return body;
};