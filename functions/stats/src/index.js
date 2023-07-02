const sdk = require("node-appwrite");
const utils = require("./lib/utils");
require("./lib/console")();
const date = require("date-fns");

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
      return;
    }

    const week_of_year = date.getISOWeek(new Date());

    console.log("Checking if stat exists in the database.");
    // check if the item already exists in the database
    const fetched_items = await database.listDocuments(
      "645c032960cb9f95212b",
      "stats",
      [
        sdk.Query.equal("user_id", data.user_id),
        sdk.Query.equal("week_of_year", week_of_year),
      ]
    );

    if (fetched_items.documents.length > 0) {
      console.log("Updating stats.");
      // if it does, update the count
      await database.updateDocument(
        "645c032960cb9f95212b",
        "stats",
        fetched_items.documents[0].$id,
        {
          number_of_plays: fetched_items.documents[0].number_of_plays + 1,
          time_spent_listening: (
            Number(fetched_items.documents[0].time_spent_listening) +
            data.track.duration
          ).toString(),
        }
      );
    } else {
      console.log("Creating new stat.");
      // if it doesn't, add it to the database
      await database.createDocument(
        "645c032960cb9f95212b",
        "stats",
        sdk.ID.unique(),
        {
          user: data.user_id,
          user_id: data.user_id,
          number_of_plays: 1,
          time_spent_listening: data.track.duration,
          week_of_year: week_of_year,
        }
      );
    }
  }

  res.send("Complete!");
};
