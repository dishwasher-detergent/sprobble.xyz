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
  let mainQueries = [sdk.Query.limit(25), sdk.Query.orderDesc("$createdAt")];

  while (!done) {
    let queries = [...mainQueries];
    if (lastId) queries.push(sdk.Query.cursorAfter(lastId));

    const data = await database.listDocuments(
      "645c032960cb9f95212b",
      "plays",
      queries
    );

    if (lastId === data.documents[data.documents.length - 1].$id) {
      done = true;
    } else {
      lastId = data.documents[data.documents.length - 1].$id;

      for (let i = 0; i < data.documents.length; i++) {
        const week_of_year = date.getISOWeek(
          new Date(data.documents[i].played_at)
        );

        if (week_of_year < 27) continue;

        console.log("Checking if stat exists in the database.");
        // check if the item already exists in the database
        const fetched_items = await database
          .listDocuments("645c032960cb9f95212b", "stats", [
            sdk.Query.equal("user_id", data.documents[i].user_id),
            sdk.Query.equal("week_of_year", week_of_year),
          ])
          .then(
            (response) => response,
            () => false
          );

        if (fetched_items.documents.length > 0) {
          console.log("Updating stats.");
          // if it does, update the count
          await database
            .updateDocument(
              "645c032960cb9f95212b",
              "stats",
              fetched_items.documents[0].$id,
              {
                number_of_plays: fetched_items.documents[0].number_of_plays + 1,
                time_spent_listening: (
                  Number(fetched_items.documents[0].time_spent_listening) +
                  data.documents[i].track.duration
                ).toString(),
              }
            )
            .then(
              (response) => console.log("Updated stat."),
              (error) => console.log("error: ", error)
            );
        } else {
          console.log("Creating new stat.");
          // if it doesn't, add it to the database
          await database
            .createDocument("645c032960cb9f95212b", "stats", sdk.ID.unique(), {
              user: data.documents[i].user_id,
              user_id: data.documents[i].user_id,
              number_of_plays: 1,
              time_spent_listening: data.documents[i].track.duration,
              week_of_year: week_of_year,
            })
            .then(
              (response) => console.log("Created stat."),
              (error) => console.log("error: ", error)
            );
        }
      }
    }
  }

  res.send("Complete!");
};
