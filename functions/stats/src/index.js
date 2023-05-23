const sdk = require("node-appwrite");

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

  //{"user":"645c06ddde2c729ce205"}

  if (!req.payload) {
    throw new Error("No payload");
  }

  const { user } = JSON.parse(req.payload);
  const plays = await getPlays(database, user);

  res.json({
    plays: plays,
  });
};

const getPlays = async (database, user) => {
  const plays = [];

  let done = false;

  while (!done) {
    const queries = [sdk.Query.equal("user_id", user), sdk.Query.limit(100)];

    if (plays.length > 0) {
      queries.push(sdk.Query.cursorAfter(plays[plays.length - 1]).$id);
    }

    const { total, documents } = await database.listDocuments(
      "645c032960cb9f95212b",
      "plays",
      queries
    );

    plays.push(documents);

    if (total == 0) done = true;
  }

  return plays;
};
