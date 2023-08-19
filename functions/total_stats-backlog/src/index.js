const sdk = require("node-appwrite");
const utils = require("./lib/utils");
const dataIds = require("./lib/appwrite");
require("./lib/console")();

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
  const limit = 100;
  let mainQueries = [sdk.Query.limit(limit), sdk.Query.orderDesc("$createdAt")];

  const payload = req.payload ? JSON.parse(req.payload) : "";

  if (!payload.collection) {
    res.send("No collection specified.");
    return;
  }

  while (!done) {
    let queries = [...mainQueries];
    if (lastId) queries.push(sdk.Query.cursorAfter(lastId));

    const data = await database.listDocuments(
      dataIds.databaseId,
      payload.collection,
      queries
    );

    if (data.documents.length < limit) {
      done = true;
    }

    lastId = data.documents[data.documents.length - 1].$id;

    const documents = data.documents;

    await utils.addStat(database, payload.collection, documents.length);
  }

  res.send("Complete!");
};
