import { Databases, ID, Query } from "node-appwrite";
import { Artist, Play, SpotifyItem, SpotifyTrack } from "../types/Types.js";
import {
  albumCollectionId,
  artistCollectionId,
  databaseId,
  playsCollectionId,
  trackCollectionId,
} from "./appwrite.js";

export const addAlbumToDatabase = async (
  item: SpotifyTrack,
  database: Databases
) => {
  const { album } = item;

  await database.getDocument(databaseId, albumCollectionId, album.id).then(
    () => {
      return;
    },
    async () => {
      await database.createDocument(databaseId, albumCollectionId, album.id, {
        name: album.name,
        href: album.external_urls.spotify,
        popularity: album.popularity ?? 0,
        images: album.images?.map((image) => image.url) ?? [],
      });
    }
  );
};

export const addArtistToDatabase = async (
  item: SpotifyTrack,
  database: Databases
) => {
  const { album } = item;

  for (let i = 0; i < album.artists.length; i++) {
    await database
      .getDocument<Artist>(databaseId, artistCollectionId, album.artists[i].id)
      .then(
        () => {
          return;
        },
        async () => {
          await database.createDocument(
            databaseId,
            artistCollectionId,
            album.artists[i].id,
            {
              name: album.artists[i].name,
              href: album.artists[i].external_urls.spotify,
              popularity: album.artists[i].popularity ?? 0,
              images: album.artists[i].images?.map((image) => image.url) ?? [],
              genres: album.artists[i].genres ?? [],
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

  await database.createDocument<Play>(
    databaseId,
    playsCollectionId,
    ID.unique(),
    {
      user_id: user_id,
      played_at: played_at,
      track: track.id,
      artist: [...track.artists.map((x) => x.id)],
      album: track.album.id,
      user: user_id,
    }
  );
};

export const createRelationships = async (
  item: SpotifyTrack,
  database: Databases
) => {
  const { album, artists } = item;

  try {
    await database.updateDocument(databaseId, albumCollectionId, album.id, {
      artist: [...album.artists.map((x) => x.id)],
    });
  } catch (err) {
    console.log(album);
    console.log((err as Error).message);
  }

  try {
    await database.updateDocument(databaseId, trackCollectionId, item.id, {
      artist: [...artists.map((x) => x.id)],
      album: album.id,
    });
  } catch (err) {
    console.log(artists)
    console.log((err as Error).message);
  }
};
