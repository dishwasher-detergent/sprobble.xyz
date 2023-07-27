const sdk = require("node-appwrite");
const utils = require("./lib/utils");
require("./lib/console")();

/*
  'req' variable has:
    'headers' - object with request headers
    'payload' - request body data as a string
    'variables' - object with function variables

  'res' variable has:
    'send(text, status)' - function to return text response. Status code defaults to 200
    'json(obj, status)' - function to return JSON response. Status code defaults to 200

  If an error is thrown, a response with code 500 will be returned.
*/

module.exports = async function (req, res) {
  const client = new sdk.Client();

  // You can remove services you don't use
  const users = new sdk.Users(client);
  const database = new sdk.Databases(client);

  if (
    !req.variables["APPWRITE_FUNCTION_ENDPOINT"] ||
    !req.variables["APPWRITE_FUNCTION_API_KEY"]
  ) {
    throw new Error("Appwrite variables are not set.");
  } else {
    client
      .setEndpoint(req.variables["APPWRITE_FUNCTION_ENDPOINT"])
      .setProject(req.variables["APPWRITE_FUNCTION_PROJECT_ID"])
      .setKey(req.variables["APPWRITE_FUNCTION_API_KEY"])
      .setSelfSigned(true);
  }

  if (
    !req.variables["SPOTIFY_CLIENT_SECRET"] ||
    !req.variables["SPOTIFY_CLIENT_ID"]
  ) {
    throw new Error("Spotify variables are not set.");
  }

  const queries = [];
  if (req.payload["user"]) {
    //{"user":"645c06ddde2c729ce205"}
    queries.push(sdk.Query.equal("$id", req.payload["user"]));
  }
  const fetched_users = await users.list(queries);

  for (let i = 0; i < fetched_users.users.length; i++) {
    if (!fetched_users.users[i].prefs.refresh_token) {
      console.log(`No refresh token for ${fetched_users.users[i].name}`);
      continue;
    }

    const spotifyAccessToken = await utils.getAccessToken(
      req.variables["SPOTIFY_CLIENT_ID"],
      req.variables["SPOTIFY_CLIENT_SECRET"],
      fetched_users.users[i].prefs.refresh_token
    );

    if (!spotifyAccessToken) {
      console.log(`No access token for ${fetched_users.users[i].name}`);
      continue;
    }

    console.log(`Fetching history for ${fetched_users.users[i].name}`);

    const history = await utils.getPlayerHistory(
      spotifyAccessToken.access_token
    );
    
    console.log("User history fetched");

    const albumIds = history.items.map(item => item.track.album.id);
    const albums = await utils.getSeveralTracks(spotifyAccessToken.access_token, albumIds);
    await utils.addAlbumToDatabase(albums, database);

    const artistIds = history.items.map(item => item.track.artists.map(artist => artist.id)).flat();
    const artists = await utils.getSeveralTracks(spotifyAccessToken.access_token, artistIds);
    await utils.addArtistToDatabase(artists, database);

    const trackIds = history.items.map(item => item.track.id);
    const tracks = await utils.getSeveralTracks(spotifyAccessToken.access_token, trackIds);
    await utils.addTrackToDatabase(tracks, database);
    await utils.addListenToDatabase(
      fetched_users.users[i].$id,
      tracks,
      database
    );
  }

  res.send("Complete!");
};
