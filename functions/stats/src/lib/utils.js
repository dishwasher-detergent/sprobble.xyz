const sdk = require("node-appwrite");
const dataIds = require("./appwrite");
const date = require("date-fns");

const getWeekOfYear = () => {
  const today = new Date();
  const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
  const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

const addStat = async (database, data, user) => {
  console.log(`Adding Stat for ${user}`);
  const week_of_year = date.getISOWeek(new Date());

  const fetched_items = await database.listDocuments(
    dataIds.databaseId,
    dataIds.statsCollectionId,
    [
      sdk.Query.equal("user_id", user),
      sdk.Query.equal("week_of_year", week_of_year),
    ]
  );

  if (fetched_items.documents.length > 0) {
    console.log("Updating stats.");
    // if it does, update the count
    await database.updateDocument(
      dataIds.databaseId,
      dataIds.statsCollectionId,
      fetched_items.documents[0].$id,
      {
        number_of_plays: fetched_items.documents[0].number_of_plays + 1,
        time_spent_listening: (isNaN(
          fetched_items.documents[0].time_spent_listening
        )
          ? 0
          : Number(fetched_items.documents[0].time_spent_listening) +
            data.track.duration
        ).toString(),
      }
    );
  } else {
    console.log("Creating new stat.");
    // if it doesn't, add it to the database
    await database.createDocument(
      dataIds.databaseId,
      dataIds.statsCollectionId,
      sdk.ID.unique(),
      {
        user: user,
        user_id: user,
        number_of_plays: 1,
        time_spent_listening: data.track.duration,
        week_of_year: week_of_year,
      }
    );
  }
};

module.exports = {
  getWeekOfYear,
  addStat,
};
