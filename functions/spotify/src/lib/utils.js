const { ID, Query } = require("node-appwrite");

const PLAYER_HISTORY_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=10`;
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

const addToDatabase = async (item, database) => {
  const { track } = item;
  console.log("Adding song data to database.");
  await addAlbumToDatabase(track, database);
  await addArtistToDatabase(track, database);
  await addTrackToDatabase(track, database);
};

const addAlbumToDatabase = async (item, database) => {
  const { album } = item;

  console.log("Adding album.");

  await database.getDocument("645c032960cb9f95212b", "album", album.id).then(
    () => {
      return;
    },
    async () => {
      await database
        .createDocument("645c032960cb9f95212b", "album", album.id, {
          name: album.name,
          href: album.external_urls.spotify,
          popularity: album.popularity,
          images: album.images?.map((image) => image.url) ?? [],
        })
        .then(
          (response) => response,
          (error) => {
            console.log("error: ", error);
            throw new Error(error);
          }
        );
    }
  );

  console.log("Album added.");
};

const addArtistToDatabase = async (item, database) => {
  const { artists, album } = item;

  console.log("Adding artist.");

  for (let i = 0; i < artists.length; i++) {
    await database
      .getDocument("645c032960cb9f95212b", "artist", artists[i].id)
      .then(
        async (response) => {
          const albums = [...response.album.map((x) => x.$id)];

          if (response.album.filter((x) => x.$id == album.id).length == 0)
            await database.updateDocument(
              "645c032960cb9f95212b",
              "artist",
              artists[i].id,
              {
                album: albums,
              }
            );
        },
        async () => {
          await database
            .createDocument("645c032960cb9f95212b", "artist", artists[i].id, {
              name: artists[i].name,
              href: artists[i].external_urls.spotify,
              popularity: artists[i].popularity,
              images: artists[i].images?.map((image) => image.url) ?? [],
              genres: artists[i].genres ?? [],
              album: [album.id],
            })
            .then(
              (response) => response,
              (error) => {
                console.log("error: ", error);
                throw new Error(error);
              }
            );
        }
      );
  }

  console.log("Artist added.");
};

const addTrackToDatabase = async (item, database) => {
  const { artists, album } = item;

  console.log("Adding track.");

  await database.getDocument("645c032960cb9f95212b", "track", item.id).then(
    () => {
      return;
    },
    async () => {
      await database
        .createDocument("645c032960cb9f95212b", "track", item.id, {
          name: item.name,
          href: item.external_urls.spotify,
          popularity: item.popularity,
          preview: item.preview_url,
          explicit: item.explicit,
          duration: item.duration_ms,
          album: album.id,
          artist: [...artists.map((x) => x.id)],
        })
        .then(
          (response) => response,
          (error) => {
            console.log("error: ", error);
            throw new Error(error);
          }
        );
    }
  );

  console.log("Track added.");
};

const addListenToDatabase = async (user_id, item, database) => {
  const { played_at, track } = item;

  console.log("Adding listen.");

  const existing = await database
    .listDocuments("645c032960cb9f95212b", "plays", [
      Query.equal("user_id", user_id),
      Query.equal("played_at", played_at),
    ])
    .then(
      (response) => response,
      () => false
    );

  if (existing.total >= 1) return;

  await database
    .createDocument("645c032960cb9f95212b", "plays", ID.unique(), {
      user_id: user_id,
      played_at: played_at,
      track: track.id,
      artist: [...track.artists.map((x) => x.id)],
      album: track.album.id,
    })
    .then(
      (response) => response,
      (error) => {
        console.log("error: ", error);
        throw new Error(error);
      }
    );

  console.log("Listen added.");
};

module.exports = {
  getAccessToken,
  getPlayerHistory,
  addToDatabase,
  addListenToDatabase,
};
