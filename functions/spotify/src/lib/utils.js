const { ID, Query } = require("node-appwrite");

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

const addToDatabase = async (item, database) => {
  const { track } = item;

  await addAlbumToDatabase(track, database);
  await addTrackToDatabase(track, database);
  await addArtistToDatabase(track, database);
};

const addTrackToDatabase = async (track, database) => {
  const { album, artists } = track;

  const existing = await database
    .getDocument("645c032960cb9f95212b", "track", track.id)
    .then(
      (response) => response,
      () => false
    );

  if (existing) {
    if (existing.album.filter((x) => x.id == album.id) > 0) return;

    await database.updateDocument("645c032960cb9f95212b", "track", track.id, {
      album: [...existing.album, album.id],
    });
    return;
  }

  await database
    .createDocument("645c032960cb9f95212b", "track", track.id, {
      id: track.id,
      name: track.name,
      href: track.external_urls.spotify,
      popularity: track.popularity,
      preview: track.preview_url,
      explicit: track.explicit,
      duration: track.duration_ms,
      album: [album.id],
    })
    .then(
      (response) => response,
      (error) => {
        console.log("error: ", error);
        throw new Error(error);
      }
    );
};

const addArtistToDatabase = async (item, database) => {
  const { artists, album } = item;

  for (let i = 0; i < artists.length; i++) {
    const existing = await database
      .getDocument("645c032960cb9f95212b", "artist", artists[i].id)
      .then(
        (response) => response,
        () => false
      );

    if (existing) {
      let albums = [];
      let tracks = [];
      
      if (existing.track.filter((x) => x.id == item.id) == 0) tracks = [...existing.track, item.id]
      if (existing.album.filter((x) => x.id == album.id) == 0) albums = [...existing.album, album.id]

      if(albums.length == 0 && tracks.length == 0) continue;
      
      await database.updateDocument(
        "645c032960cb9f95212b",
        "artist",
        artists[i].id,
        {
          track: tracks,
          albums: albums,
        }
      );
      continue;
    }

    await database
      .createDocument("645c032960cb9f95212b", "artist", artists[i].id, {
        id: artists[i].id,
        name: artists[i].name,
        href: artists[i].external_urls.spotify,
        popularity: artists[i].popularity,
        images: artists[i].images?.map((image) => image.url) ?? [],
        genres: artists[i].genres ?? [],
        album: [item.album.id],
        track: [item.id],
      })
      .then(
        (response) => response,
        (error) => {
          console.log("error: ", error);
          throw new Error(error);
        }
      );
  }
};

const addAlbumToDatabase = async (item, database) => {
  const { artist, album } = item;

  const existing = await database
    .getDocument("645c032960cb9f95212b", "album", album.id)
    .then(
      () => true,
      () => false
    );

  if (existing) return;

  await database
    .createDocument("645c032960cb9f95212b", "album", album.id, {
      id: album.id,
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
};

const addListenToDatabase = async (user_id, played_at, track_id, database) => {
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
      track: [track_id],
    })
    .then(
      (response) => response,
      (error) => {
        console.log("error: ", error);
        throw new Error(error);
      }
    );
};

module.exports = {
  getAccessToken,
  getPlayerHistory,
  addToDatabase,
  addListenToDatabase,
};
