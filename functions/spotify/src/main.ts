import { Client, Databases, Users } from "node-appwrite";
import {
  addAlbumToDatabase,
  addArtistToDatabase,
  addListenToDatabase,
  addTrackToDatabase,
} from "./utils/database";
import {
  checkAuthorization,
  getAccessToken,
  getPlayerHistory,
} from "./utils/spotify";

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
    const user = fetched_users.users[i];

    if (!user.prefs.refresh_token) {
      log(`No refresh token for ${user.name}`);
      continue;
    }

    let authorization = false;
    let spotifyAccessToken = null;
    let spotifyHistory = null;

    try {
      log(`Checking authorization for ${user.name}`);
      authorization = await checkAuthorization(database, user.$id);
    } catch (err) {
      error(`Error checking authorization for ${user.name}`);
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
      error(`Error getting access token for ${user.name}`);
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
      error(`Error getting player history for ${user.name}`);
      continue;
    }

    if (spotifyHistory != null && spotifyHistory.items) continue;

    for (let j = 0; j < spotifyHistory.items.length; j++) {
      const spotifyItem = spotifyHistory.items[j];
      const track = spotifyItem.track;

      try {
        await addAlbumToDatabase(track, database);
      } catch (err) {
        error(`Error adding album to database for ${user.name}`);
        continue;
      }

      try {
        await addArtistToDatabase(track, database);
      } catch (err) {
        error(`Error adding artist to database for ${user.name}`);
        continue;
      }

      try {
        await addTrackToDatabase(track, database);
      } catch (err) {
        error(`Error adding track to database for ${user.name}`);
        continue;
      }

      try {
        await addListenToDatabase(user.$id, spotifyItem, database);
      } catch (err) {
        error(`Error adding listen to database for ${user.name}`);
        continue;
      }
    }
  }

  res.send("Complete");
};
