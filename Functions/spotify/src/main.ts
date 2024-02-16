import { Client, Databases, Users } from "node-appwrite";
import {
  addAlbumToDatabase,
  addArtistToDatabase,
  addListenToDatabase,
  addTrackToDatabase,
  createRelationships,
} from "./utils/database.js";
import {
  checkAuthorization,
  getAccessToken,
  getPlayerHistory,
} from "./utils/spotify.js";

type Context = {
  req: any;
  res: any;
  log: (msg: any) => void;
  error: (msg: any) => void;
};

export default async ({ req, res, log, error }: Context) => {
  const client = new Client();

  const users = new Users(client);
  const database = new Databases(client);

  client
    .setEndpoint(process.env.APPWRITE_FUNCTION_ENDPOINT as string)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID as string)
    .setKey(process.env.APPWRITE_FUNCTION_API_KEY as string)
    .setSelfSigned(true);

  if (!process.env.SPOTIFY_CLIENT_SECRET || !process.env.SPOTIFY_CLIENT_ID) {
    error("Spotify variables are not set.");
  }

  const fetched_users = await users.list<{ refresh_token: string }>();

  for (let i = 0; i < fetched_users.users.length; i++) {
    log("============");

    const user = fetched_users.users[i];

    if (!user.prefs.refresh_token) {
      log(`No refresh token for ${user.name}.`);
      continue;
    }

    let authorization = false;
    let spotifyAccessToken = null;
    let spotifyHistory = null;

    try {
      log(`Checking authorization for ${user.name}`);
      authorization = await checkAuthorization(database, user.$id);
    } catch (err) {
      log(`Error checking authorization for ${user.name}.`);
      error((err as Error).message);
      continue;
    }

    if (!authorization) continue;

    try {
      log(`Getting access token for ${user.name}`);
      spotifyAccessToken = await getAccessToken(
        process.env.SPOTIFY_CLIENT_ID as string,
        process.env.SPOTIFY_CLIENT_SECRET as string,
        user.prefs.refresh_token
      );
    } catch (err) {
      log(`Error getting access token for ${user.name}.`);
      error((err as Error).message);
      continue;
    }

    if (!spotifyAccessToken) {
      log(`No access token for ${user.name}`);
      continue;
    }

    try {
      log(`Fetching history for ${user.name}`);
      spotifyHistory = await getPlayerHistory(spotifyAccessToken.access_token);
    } catch (err) {
      log(`Error getting player history for ${user.name}.`);
      error((err as Error).message);
      continue;
    }

    if (spotifyHistory == null || spotifyHistory.items.length == 0) {
      log(`No history items for ${user.name}.`);
      continue;
    }

    try {
      log(`Adding albums`);

      await Promise.allSettled(
        spotifyHistory.items.map((item: any) => {
          addAlbumToDatabase(item.track, database);
        })
      );
    } catch (err) {
      log(`Error adding albums to database for ${user.name}`);
      error((err as Error).message);
      continue;
    }

    try {
      log(`Adding artists`);

      await Promise.allSettled(
        spotifyHistory.items.map((item: any) => {
          addArtistToDatabase(item.track, database);
        })
      );
    } catch (err) {
      log(`Error adding artists to database for ${user.name}`);
      error((err as Error).message);
      continue;
    }

    try {
      log(`Adding tracks`);

      await Promise.allSettled(
        spotifyHistory.items.map((item: any) => {
          addTrackToDatabase(item.track, database);
        })
      );
    } catch (err) {
      log(`Error adding tracks to database for ${user.name}`);
      error((err as Error).message);
      continue;
    }

    try {
      log(`Creating relationships`);

      await Promise.allSettled(
        spotifyHistory.items.map((item: any) => {
          createRelationships(item.track, database);
        })
      );
    } catch (err) {
      log(`Error creating relationships for ${user.name}`);
      error((err as Error).message);
      continue;
    }

    try {
      log(`Adding listens`);

      await Promise.allSettled(
        spotifyHistory.items.map((item: any) => {
          addListenToDatabase(user.$id, item, database);
        })
      );
    } catch (err) {
      log(`Error adding listens to database for ${user.name}`);
      error((err as Error).message);
      continue;
    }
  }

  return res.send("Complete");
};
