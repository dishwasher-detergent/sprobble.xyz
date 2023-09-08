import { Databases, Query } from "node-appwrite";
import { Stat } from "../types/Types.js";

const sdk = require("node-appwrite");
const dataIds = require("./appwrite");
const date = require("date-fns");

export const getWeekOfYear = () => {
  const today = new Date();
  const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
  const pastDaysOfYear =
    (today.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

export const addStat = async (database: Databases, data: any, user: string) => {
  const week_of_year = date.getISOWeek(new Date());

  const fetched_items = await database.listDocuments<Stat>(
    dataIds.databaseId,
    dataIds.statsCollectionId,
    [Query.equal("user_id", user), Query.equal("week_of_year", week_of_year)]
  );

  if (fetched_items.documents.length > 0) {
    await database.updateDocument(
      dataIds.databaseId,
      dataIds.statsCollectionId,
      fetched_items.documents[0].$id,
      {
        number_of_plays: fetched_items.documents[0].number_of_plays + 1,
        time_spent_listening: (fetched_items.documents[0]
          .time_spent_listening == "NaN"
          ? 0
          : Number(fetched_items.documents[0].time_spent_listening) +
            data.track.duration
        ).toString(),
      }
    );
  } else {
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
