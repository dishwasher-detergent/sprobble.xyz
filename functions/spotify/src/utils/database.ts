import { Databases, ID, Query } from "node-appwrite";
import { Artist, SpotifyItem, SpotifyTrack } from "../types/Types";
import {
  albumCollectionId,
  artistCollectionId,
  databaseId,
  playsCollectionId,
  trackCollectionId,
} from "./appwrite";

export const addAlbumToDatabase = async (
  item: SpotifyTrack,
  database: Databases
) => {
  const { album } = item;

  await database.getDocument(databaseId, albumCollectionId, album.id).then(
    () => {
      console.log("Album already exists.");
      return;
    },
    async () => {
      await database.createDocument(databaseId, albumCollectionId, album.id, {
        name: album.name,
        href: album.external_urls.spotify,
        popularity: album.popularity,
        images: album.images?.map((image) => image.url) ?? [],
      });
    }
  );
};

export const addArtistToDatabase = async (
  item: SpotifyTrack,
  database: Databases
) => {
  const { artists, album } = item;

  for (let i = 0; i < artists.length; i++) {
    await database
      .getDocument<Artist>(databaseId, artistCollectionId, artists[i].id)
      .then(
        async (response) => {
          const albums = [...response.album.map((x) => x.$id)];
          if (albums.length == 1 && albums[0] == album.id) return;

          if (response.album.some((x) => x.$id == album.id)) {
            await database.updateDocument(
              databaseId,
              artistCollectionId,
              artists[i].id,
              {
                album: albums,
              }
            );
          }
        },
        async () => {
          await database.createDocument(
            databaseId,
            artistCollectionId,
            artists[i].id,
            {
              name: artists[i].name,
              href: artists[i].external_urls.spotify,
              popularity: artists[i].popularity,
              images: artists[i].images?.map((image) => image.url) ?? [],
              genres: artists[i].genres ?? [],
              album: [album.id],
            }
          );
        }
      );
  }
};

export const addTrackToDatabase = async (
  item: SpotifyTrack,
  database: Databases
) => {
  const { artists, album } = item;

  await database.getDocument(databaseId, trackCollectionId, item.id).then(
    () => null,
    async () => {
      await database.createDocument(databaseId, trackCollectionId, item.id, {
        name: item.name,
        href: item.external_urls.spotify,
        popularity: item.popularity,
        preview: item.preview_url,
        explicit: item.explicit,
        duration: item.duration_ms,
        album: album.id,
        artist: [...artists.map((x) => x.id)],
      });
    }
  );
};

export const addListenToDatabase = async (
  user_id: string,
  item: SpotifyItem,
  database: Databases
) => {
  const { played_at, track } = item;

  const existing = await database.listDocuments(databaseId, playsCollectionId, [
    Query.equal("user_id", user_id),
    Query.equal("played_at", played_at),
  ]);

  if (existing.total >= 1) return;

  await database.createDocument(databaseId, playsCollectionId, ID.unique(), {
    user_id: user_id,
    played_at: played_at,
    track: track.id,
    artist: [...track.artists.map((x) => x.id)],
    album: track.album.id,
  });
};
