const sdk = require("node-appwrite");
const { SpotifyService } = require("./services/spotify");

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

// https://accounts.spotify.com/authorize?client_id=PASTE_HERE&
// response_type=code&redirect_uri=PASTE_HERE&
// scope=user-read-private%20user-read-currently-playing

module.exports = async function (req, res) {
  const client = new sdk.Client();
  const database = new sdk.Databases(client);
  const spotify = new SpotifyService();

  if (
    !req.variables["APPWRITE_FUNCTION_ENDPOINT"] ||
    !req.variables["APPWRITE_FUNCTION_API_KEY"]
  ) {
    res.send(401);
  } else {
    client
      .setEndpoint(req.variables["APPWRITE_FUNCTION_ENDPOINT"])
      .setProject(req.variables["APPWRITE_FUNCTION_PROJECT_ID"])
      .setKey(req.variables["APPWRITE_FUNCTION_API_KEY"])
      .setSelfSigned(true);
  }

  if (
    !req.variables["SPOTIFY_CLIENT_ID"] ||
    !req.variables["SPOTIFY_CLIENT_SECRET"] ||
    !req.variables["SPOTIFY_REDIRECT_URL"]
  ) {
    res.send(401);
  } else {
    spotify
      .setClientId(req.variables["SPOTIFY_CLIENT_ID"])
      .setClientSecret(req.variables["SPOTIFY_CLIENT_SECRET"])
      .setRedirectUrl(req.variables["SPOTIFY_REDIRECT_URL"]);
  }

  const song = spotify.getCurrentlyPlayingSong();
  console.log(song);

  res.json({
    areDevelopersAwesome: true,
  });
};
