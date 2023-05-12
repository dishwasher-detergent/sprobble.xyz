const sdk = require("node-appwrite");
const utils = require("./lib/utils");

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

  const fetched_users = await users.list();

  for (let i = 0; i < fetched_users.users.length; i++) {
    if (!fetched_users.users[i].prefs.refresh_token) continue;

    const spotifyAccessToken = await utils.getAccessToken(
      req.variables["SPOTIFY_CLIENT_ID"],
      req.variables["SPOTIFY_CLIENT_SECRET"],
      fetched_users.users[i].prefs.refresh_token
    );

    if (!spotifyAccessToken.access_token) continue;

    const history = await utils.getPlayerHistory(
      spotifyAccessToken.access_token
    );

    for (let i = 0; i < history.items.length; i++) {
      const response = await utils.addTrackToDatabase(
        history.items[i],
        database
      );

      await utils.addListenToDatabase(
        fetched_users.users[i].$id,
        history.items[i].item.played_at,
        response.track.$id,
        database
      );
    }

    setTimeout(() => {}, 1000);
  }

  res.send("Complete!");
};
