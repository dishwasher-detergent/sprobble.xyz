const { ID, Query } = require("node-appwrite");

const PLAYER_HISTORY_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`;
const SEVERAL_TRACKS_ENDPOINT = `https://api.spotify.com/v1/trakcs`;
const SEVERAL_ARTISTS_ENDPOINT = `https://api.spotify.com/v1/artists`;
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

const getSeveralTracks = async (ACCESS_TOKEN, trackIds) => {
  const params = new URLSearchParams({
    ids: trackIds,
  });

  const response = await fetch(`${SEVERAL_TRACKS_ENDPOINT}?${params}`, {
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
}

const getSeveralArtists = async (ACCESS_TOKEN, artistIds) => {
  const params = new URLSearchParams({
    ids: artistIds,
  });

  const response = await fetch(`${SEVERAL_ARTISTS_ENDPOINT}?${params}`, {
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
}

const getSeveralAlbums = async (ACCESS_TOKEN, albumIds) => {
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
}

const addToDatabase = async (item, database) => {
  const { track } = item;
  console.log("Adding song data to database.");
  await addAlbumToDatabase(track, database);
  await addArtistToDatabase(track, database);
  await addTrackToDatabase(track, database);
};

const addAlbumToDatabase = async (item, database) => {
  const { albums } = item;

  for(let i = 0; i < albums.length; i++) {
    console.log(`Adding album, ${albums[i].name}`);
  
    await database.getDocument("645c032960cb9f95212b", "album", albums[i].id).then(
      () => {
        console.log("Album already exists.");
        return;
      },
      async () => {
        await database
          .createDocument("645c032960cb9f95212b", "album", albums[i].id, {
            name: albums[i].name,
            href: albums[i].external_urls.spotify,
            popularity: albums[i].popularity,
            images: albums[i].images?.map((image) => image.url) ?? [],
            genres: albums[i].genres,
          })
          .then(
            (response) => "Album Created",
            (error) => console.log("error: ", error)
          );
      }
    );
  }

};

const addArtistToDatabase = async (item, database) => {
  const { artists } = item;

  for (let i = 0; i < artists.length; i++) {
    console.log(`Adding artist, ${artists[i].name}`);
    await database
      .getDocument("645c032960cb9f95212b", "artist", artists[i].id)
      .then(
        async (response) => {
          const albums = [...response.album.map((x) => x.$id)];
          if (albums.length == 1 && albums[0] == album.id) return;

          if (response.album.some((x) => x.$id == album.id)) {
            await database
              .updateDocument("645c032960cb9f95212b", "artist", artists[i].id, {
                album: albums,
              })
              .then(
                (response) => "Artist Updated",
                (error) => console.log("error: ", error)
              );
          }
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
              (response) => "Artist Created",
              (error) => console.log("error: ", error)
            );
        }
      );
  }
};

const addTrackToDatabase = async (item, database) => {
  const { tracks } = item;

  for(let i = 0; i < tracks.length; i++) {
    console.log(`Adding track, ${tracks[i].name}`);
  
    await database.getDocument("645c032960cb9f95212b", "track", tracks[i].id).then(
      () => {
        console.log("Track already exists.");
        return;
      },
      async () => {
        await database
          .createDocument("645c032960cb9f95212b", "track", tracks[i].id, {
            name: tracks[i].name,
            href: tracks[i].external_urls.spotify,
            popularity: tracks[i].popularity,
            preview: tracks[i].preview_url,
            explicit: tracks[i].explicit,
            duration: tracks[i].duration_ms,
            album: tracks[i].album.id,
            artist: [...tracks[i].artists.map((x) => x.id)],
          })
          .then(
            (response) => "Track Created",
            (error) => console.log("error: ", error)
          );
      }
    );
  }
};

const addListenToDatabase = async (user_id, item, database) => {
  const { tracks } = item;

  for(let i = 0; i < tracks.length; i++) {
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
        track: tracks[i].id,
        artist: [...tracks[i].artists.map((x) => x.id)],
        album: tracks[i].album.id,
      })
      .then(
        (response) => "Play Created",
        (error) => console.log("error: ", error)
      );
  }
};

module.exports = {
  getAccessToken,
  getPlayerHistory,
  getSeveralAlbums,
  getSeveralArtists,
  getSeveralTracks,
  addToDatabase,
  addListenToDatabase,
};
