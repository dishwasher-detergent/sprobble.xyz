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
  const limit = 25;
  let mainQueries = [sdk.Query.limit(limit), sdk.Query.orderDesc("$createdAt")];

  const payload = req.payload ? JSON.parse(req.payload) : "";
  if (payload.week_of_year) {
    // {"week_of_year":27}

    const weekNumber = payload.week_of_year;
    const currentYear = new Date().getFullYear();

    const startDate = date.startOfWeek(new Date(currentYear, 0, 1));
    const sunday = date.addDays(startDate, (weekNumber - 1) * 7);
    const saturday = date.addDays(sunday, 6);

    console.log("firstDateOfWeek: ", sunday.toUTCString());
    console.log("lastDateOfWeek: ", saturday.toUTCString());

    mainQueries.push(
      sdk.Query.greaterThanEqual("played_at", sunday.toISOString())
    );

    mainQueries.push(
      sdk.Query.lessThanEqual("played_at", saturday.toISOString())
    );
  }

  while (!done) {
    let queries = [...mainQueries];
    if (lastId) queries.push(sdk.Query.cursorAfter(lastId));

    const data = await database.listDocuments(
      "645c032960cb9f95212b",
      "plays",
      queries
    );

    if (data.documents.length < limit) {
      done = true;
    }

    lastId = data.documents[data.documents.length - 1].$id;

    for (let i = 0; i < data.documents.length; i++) {
      const week_of_year = date.getISOWeek(
        new Date(data.documents[i].played_at)
      );

      console.log("week_of_year: ", week_of_year);

      console.log("Checking if stat exists in the database.");
      // check if the item already exists in the database
      const response = await database
        .listDocuments("645c032960cb9f95212b", "stats", [
          sdk.Query.equal("user_id", data.documents[i].user_id),
          sdk.Query.equal("week_of_year", week_of_year),
        ])
        .then((response) => response)
        .catch((error) => console.log("Error Fetching: ", error));

      if (response.documents.length > 0) {
        console.log("Updating stats.");
        // if it does, update the count
        await database
          .updateDocument(
            "645c032960cb9f95212b",
            "stats",
            response.documents[0].$id,
            {
              number_of_plays: response.documents[0].number_of_plays + 1,
              time_spent_listening: (
                Number(response.documents[0].time_spent_listening) +
                (data.documents[i].track?.duration ?? 0)
              ).toString(),
            }
          )
          .then((response) => console.log("Updated stat."))
          .catch((error) => console.log("Error Updating: ", error));
      } else {
        console.log("Creating new stat.");
        // if it doesn't, add it to the database
        await database
          .createDocument("645c032960cb9f95212b", "stats", sdk.ID.unique(), {
            user: data.documents[i].user_id,
            user_id: data.documents[i].user_id,
            number_of_plays: 1,
            time_spent_listening: data.documents[i].track?.duration ?? 0,
            week_of_year: week_of_year,
          })
          .then((response) => console.log("Created stat."))
          .catch((error) => console.log("Error Creating: ", error));
      }
    }
  }

  res.send("Complete!");
};
