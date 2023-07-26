const sdk = require("node-appwrite");
const utils = require("./lib/utils");
require("./lib/console")();
const date = require("date-fns");

module.exports = async function (req, res) {
  const client = new sdk.Client();

  // You can remove services you don't use
  const database = new sdk.Databases(client);

  if (
    !req.variables["APPWRITE_FUNCTION_ENDPOINT"] ||
    !req.variables["APPWRITE_FUNCTION_API_KEY"]
  ) {
    console.warn(
      "Environment variables are not set. Function cannot use Appwrite SDK."
    );
  } else {
    client
      .setEndpoint(req.variables["APPWRITE_FUNCTION_ENDPOINT"])
      .setProject(req.variables["APPWRITE_FUNCTION_PROJECT_ID"])
      .setKey(req.variables["APPWRITE_FUNCTION_API_KEY"])
      .setSelfSigned(true);
  }

  let done = false;
  let lastId = null;
  const limit = 50;
  let mainQueries = [sdk.Query.limit(limit), sdk.Query.orderDesc("$createdAt")];

  const payload = req.payload ? JSON.parse(req.payload) : "";

  while (!done) {
    let queries = [...mainQueries];
    if (lastId) queries.push(sdk.Query.cursorAfter(lastId));

    const data = await database.listDocuments(
      "645c032960cb9f95212b",
      "album",
      queries
    );

    if (data.documents.length < limit) {
      done = true;
    }

    lastId = data.documents[data.documents.length - 1].$id;

    const spotifyAccessToken = await utils.getAccessToken(
      req.variables["SPOTIFY_CLIENT_ID"],
      req.variables["SPOTIFY_CLIENT_SECRET"],
      req.variables["SPOTIFY_REFRESH_TOKEN"]
    );

    if (!spotifyAccessToken) {
      console.log(`No access token!`);
      continue;
    }

    const albums = data.documents.map(x => x.$id);

    const fetchedAlbums = await utils.getAlbumsFromSpotify(
      spotifyAccessToken.access_token,
      albums
    );

    for (let i = 0; i < fetchedAlbums.albums.length; i++) {
      console.log("Updating stats.");
      await database
        .updateDocument(
          "645c032960cb9f95212b",
          "ablum",
          fetchedAlbums.albums[i].id,
          {
            genres: fetchedAlbums.albums[i].genres
          }
        )
        .then((response) => console.log("Updated album genre."))
        .catch((error) => console.log("Error Updating: ", error));

        for(let j = 0; j < fetchedAlbums.albums[i].artists.length; i++) {
          await database
            .updateDocument(
              "645c032960cb9f95212b",
              "artist",
              fetchedAlbums.albums[i].artists[j].id,
              {
                genres: fetchedAlbums.albums[i].artists[j].genres
              }
            )
            .then((response) => console.log("Updated artist genre."))
            .catch((error) => console.log("Error Updating: ", error));
        }
    }
  }

  res.send("Complete!");
};
