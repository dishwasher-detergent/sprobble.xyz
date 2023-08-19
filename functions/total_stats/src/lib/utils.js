const sdk = require("node-appwrite");
const dataIds = require("./appwrite");

const addStat = async (database, title) => {
  console.log(`Adding Stat for ${title}`);

  let fetched_items = null;

  try {
    fetched_items = await database.getDocument(
      dataIds.databaseId,
      dataIds.totalStatsCollectionId,
      title
    );
  } catch (error) {
    console.log(error);
  }

  if (fetched_items) {
    console.log("Updating stats.");
    // if it does, update the count
    await database.updateDocument(
      dataIds.databaseId,
      dataIds.totalStatsCollectionId,
      fetched_items.$id,
      {
        count: fetched_items.count + 1,
      }
    );
  } else {
    console.log("Creating new stat.");
    // if it doesn't, add it to the database
    await database.createDocument(
      dataIds.databaseId,
      dataIds.totalStatsCollectionId,
      title,
      {
        title: title,
        count: 1,
      }
    );
  }
};

module.exports = {
  addStat,
};
