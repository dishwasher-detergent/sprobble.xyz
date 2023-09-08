import { Databases } from "node-appwrite";
import { TotalStats } from "../types/Types.js";

const sdk = require("node-appwrite");
const dataIds = require("./appwrite");
const date = require("date-fns");

export const addStat = async (database: Databases, title: string) => {
  const fetched_items = await database.getDocument<TotalStats>(
    dataIds.databaseId,
    dataIds.totalStatsCollectionId,
    title
  );

  if (fetched_items) {
    await database.updateDocument(
      dataIds.databaseId,
      dataIds.totalStatsCollectionId,
      fetched_items.$id,
      {
        count: fetched_items.count + 1,
      }
    );
  } else {
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
