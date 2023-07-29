const { ID, Query } = require("node-appwrite");
const dataIds = require("./appwrite");

const PLAYER_HISTORY_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`;
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
  const date = Date.now() - 1800000;
  console.log("After: ", date);

  const params = new URLSearchParams({
    after: date,
    limit: 25,
  });

  const response = await fetch(`${PLAYER_HISTORY_ENDPOINT}?${params}`, {
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

  console.log(`Adding album, ${album.name}`);

  await database
    .getDocument(dataIds.databaseId, dataIds.albumCollectionId, album.id)
    .then(
      () => {
        console.log("Album already exists.");
        return;
      },
      async () => {
        await database
          .createDocument(
            dataIds.databaseId,
            dataIds.albumCollectionId,
            album.id,
            {
              name: album.name,
              href: album.external_urls.spotify,
              popularity: album.popularity,
              images: album.images?.map((image) => image.url) ?? [],
            }
          )
          .then(
            (response) => "Album Created",
            (error) => console.log("error: ", error)
          );
      }
    );
};

const addArtistToDatabase = async (item, database) => {
  const { artists, album } = item;

  for (let i = 0; i < artists.length; i++) {
    console.log(`Adding artist, ${artists[i].name}`);
    await database
      .getDocument(
        dataIds.databaseId,
        dataIds.artistCollectionId,
        artists[i].id
      )
      .then(
        async (response) => {
          const albums = [...response.album.map((x) => x.$id)];
          if (albums.length == 1 && albums[0] == album.id) return;

          if (response.album.some((x) => x.$id == album.id)) {
            await database
              .updateDocument(
                dataIds.databaseId,
                dataIds.artistCollectionId,
                artists[i].id,
                {
                  album: albums,
                }
              )
              .then(
                (response) => "Artist Updated",
                (error) => console.log("error: ", error)
              );
          }
        },
        async () => {
          await database
            .createDocument(
              dataIds.databaseId,
              dataIds.artistCollectionId,
              artists[i].id,
              {
                name: artists[i].name,
                href: artists[i].external_urls.spotify,
                popularity: artists[i].popularity,
                images: artists[i].images?.map((image) => image.url) ?? [],
                genres: artists[i].genres ?? [],
                album: [album.id],
              }
            )
            .then(
              (response) => "Artist Created",
              (error) => console.log("error: ", error)
            );
        }
      );
  }
};

const addTrackToDatabase = async (item, database) => {
  const { artists, album } = item;

  console.log(`Adding track, ${item.name}`);

  await database
    .getDocument(dataIds.databaseId, dataIds.trackCollectionId, item.id)
    .then(
      () => {
        console.log("Track already exists.");
        return;
      },
      async () => {
        await database
          .createDocument(
            dataIds.databaseId,
            dataIds.trackCollectionId,
            item.id,
            {
              name: item.name,
              href: item.external_urls.spotify,
              popularity: item.popularity,
              preview: item.preview_url,
              explicit: item.explicit,
              duration: item.duration_ms,
              album: album.id,
              artist: [...artists.map((x) => x.id)],
            }
          )
          .then(
            (response) => "Track Created",
            (error) => console.log("error: ", error)
          );
      }
    );
};

const addListenToDatabase = async (user_id, item, database) => {
  const { played_at, track } = item;

  console.log("Adding listen.");

  const existing = await database
    .listDocuments(dataIds.databaseId, dataIds.playsCollectionId, [
      Query.equal("user_id", user_id),
      Query.equal("played_at", played_at),
    ])
    .then(
      (response) => response,
      () => false
    );

  if (existing.total >= 1) return;

  await database
    .createDocument(
      dataIds.databaseId,
      dataIds.playsCollectionId,
      ID.unique(),
      {
        user_id: user_id,
        played_at: played_at,
        track: track.id,
        artist: [...track.artists.map((x) => x.id)],
        album: track.album.id,
      }
    )
    .then(
      (response) => "Play Created",
      (error) => console.log("error: ", error)
    );
};

module.exports = {
  getAccessToken,
  getPlayerHistory,
  addToDatabase,
  addListenToDatabase,
};
