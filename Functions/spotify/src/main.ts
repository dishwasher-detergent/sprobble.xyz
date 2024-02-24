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
    log(
      "----------------------------------------------------------------------------"
    );

    const user = fetched_users.users[i];

    if (!user.prefs.refresh_token) {
      log(`No refresh token for ${user.name}.`);
      continue;
    }

    let authorization = false;
    let spotifyAccessToken = null;
    let spotifyHistory = null;

    try {
      log(`${new Date().toString()}: Checking authorization for ${user.name}`);
      authorization = await checkAuthorization(database, user.$id);
    } catch (err) {
      log(
        `${new Date().toString()}: Error checking authorization for ${user.name}.`
      );
      error((err as Error).message);
      continue;
    }

    if (!authorization) continue;

    try {
      log(`${new Date().toString()}: Getting access token for ${user.name}`);
      spotifyAccessToken = await getAccessToken(
        process.env.SPOTIFY_CLIENT_ID as string,
        process.env.SPOTIFY_CLIENT_SECRET as string,
        user.prefs.refresh_token
      );
    } catch (err) {
      log(
        `${new Date().toString()}: Error getting access token for ${user.name}.`
      );
      error((err as Error).message);
      continue;
    }

    if (!spotifyAccessToken) {
      log(`${new Date().toString()}: No access token for ${user.name}`);
      continue;
    }

    try {
      log(`${new Date().toString()}: Fetching history for ${user.name}`);
      spotifyHistory = await getPlayerHistory(spotifyAccessToken.access_token);
    } catch (err) {
      log(
        `${new Date().toString()}: Error getting player history for ${user.name}.`
      );
      error((err as Error).message);
      continue;
    }

    if (spotifyHistory == null || spotifyHistory.items.length == 0) {
      log(`${new Date().toString()}: No history items for ${user.name}.`);
      continue;
    }

    log(`${new Date().toString()}: Adding`);

    for (let i = 0; i < spotifyHistory.items.length; i++) {
      const results = await Promise.allSettled([
        addAlbumToDatabase(spotifyHistory.items[i].track, database),
        addArtistToDatabase(spotifyHistory.items[i].track, database),
        addTrackToDatabase(spotifyHistory.items[i].track, database),
      ]);

      results
        .filter((x) => x.status === "rejected")
        .forEach((x) => {
          error(
            `${new Date().toString()}: Error adding item to database. ${x.toString()}`
          );
        });

      let listenId = null;

      try {
        listenId = await addListenToDatabase(
          user.$id,
          spotifyHistory.items[i],
          database
        );
      } catch (err) {
        log(`${new Date().toString()}: Error adding listen to database.`);
        error((err as Error).message);
      }

      try {
        await createRelationships(
          spotifyHistory.items[i].track,
          listenId,
          database
        );
      } catch (err) {
        log(
          `${new Date().toString()}: Error creating relationships ${user.name}`
        );
        error((err as Error).message);
      }
    }

    log(`${new Date().toString()}: Finished`);
  }

  return res.send("Complete");
};
