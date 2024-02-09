import { Databases } from "node-appwrite";
import { TotalStats } from "../types/Types.js";
import { databaseId, totalStatsCollectionId } from "./appwrite.js";

export const addStat = async (database: Databases, title: string) => {
  let fetched_items = null;
  try {
    fetched_items = await database.getDocument<TotalStats>(
      databaseId,
      totalStatsCollectionId,
      title
    );

    await database.updateDocument(
      databaseId,
      totalStatsCollectionId,
      fetched_items.$id,
      {
        count: fetched_items.count + 1,
      }
    );
  } catch (err) {
    await database.createDocument(databaseId, totalStatsCollectionId, title, {
      title: title,
      count: 1,
    });
  }
};
