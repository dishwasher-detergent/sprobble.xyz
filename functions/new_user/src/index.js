const sdk = require("node-appwrite");
const dataIds = require("./lib/appwrite");
require("./lib/console")();

module.exports = async function (req, res) {
  const client = new sdk.Client();
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

    const data = JSON.parse(req.variables["APPWRITE_FUNCTION_EVENT_DATA"]);

    if (!data) {
      console.log("No data found in event.");
      res.send("No data found in event.");
      return;
    }

    await database.createDocument(
      dataIds.databaseId,
      dataIds.userCollectionId,
      data.$id,
      {
        name: data.name,
        user_id: data.$id,
        created_at: data.$createdAt,
      }
    );
  }

  res.send("Complete!");
};
