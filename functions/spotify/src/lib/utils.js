const { ID } = require("node-appwrite");

const PLAYER_HISTORY_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=5`;
const REFRESH_TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

const getAccessToken = async (
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REFRESH_TOKEN
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
    console.log("Spotify fetcher response was not ok", response.status);
    console.log(body);
    return;
  }

  return body;
};

const getPlayerHistory = async (ACCESS_TOKEN) => {
  const response = await fetch(PLAYER_HISTORY_ENDPOINT, {
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

const addTrackToDatabase = async (item, database) => {
  const { track } = item;
  const { artist, album } = track;

  const existing = await database
    .getDocument("645c032960cb9f95212b", "album", track.album.id)
    .then(
      () => true,
      () => false
    );

  if (existing) return;

  const artists = [];

  for (let i = 0; i < track.artists.length; i++) {
    artists.push({
      id: artist[i].id,
      name: artist[i].name,
      href: artist[i].external_urls.spotify,
      popularity: artist[i].popularity,
      images: artist[i].images?.map((image) => image.url) ?? [],
      genres: artist[i].genres ?? [],
    });
  }

  const song = [
    {
      id: track.id,
      name: track.name,
      href: track.external_urls.spotify,
      popularity: track.popularity,
      preview: track.preview_url,
      explicit: track.explicit,
      duration: track.duration_ms,
    },
  ];

  await database
    .createDocument("645c032960cb9f95212b", "album", album.id, {
      id: album.id,
      name: album.name,
      href: album.external_urls.spotify,
      popularity: album.popularity,
      images: album.images?.map((image) => image.url) ?? [],
      artist: artists,
      track: song,
    })
    .then(
      function (response) {
        return response;
      },
      function (error) {
        console.log("error: ", error);
        throw new Error(error);
      }
    );
};

const addListenToDatabase = async (user_id, played_at, track_id, database) => {
  await database
    .createDocument("645c032960cb9f95212b", "plays", ID.unique(), {
      user_id: user_id,
      played_at: played_at,
      track: track_id,
    })
    .then(
      function (response) {
        console.log(response);
        return response;
      },
      function (error) {
        console.log("error: ", error);
        throw new Error(error);
      }
    );
};

module.exports = {
  getAccessToken,
  getPlayerHistory,
  addTrackToDatabase,
  addListenToDatabase,
};
