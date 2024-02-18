import { getISOWeek } from "date-fns";
import { Databases, ID, Query } from "node-appwrite";
import { Stat } from "../types/Types.js";
import { databaseId, statsCollectionId } from "./appwrite.js";

export const getWeekOfYear = () => {
  const today = new Date();
  const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
  const pastDaysOfYear =
    (today.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

export const addStat = async (database: Databases, data: any, user: string, isUser: boolean = true, type: string = "user") => {
  const week_of_year = getISOWeek(new Date());

  const fetched_items = await database.listDocuments<Stat>(
    databaseId,
    statsCollectionId,
    [Query.equal("user_id", user), Query.equal("week_of_year", week_of_year)]
  );

  if (fetched_items.documents.length > 0) {
    await database.updateDocument(
      databaseId,
      statsCollectionId,
      fetched_items.documents[0].$id,
      {
        number_of_plays: fetched_items.documents[0].number_of_plays + 1,
        time_spent_listening: (fetched_items.documents[0]
          .time_spent_listening == "NaN"
          ? 0
          : Number(fetched_items.documents[0].time_spent_listening) +
            data.track.duration
        ).toString(),
        isUser: isUser
      }
    );
  } else {
    let itemData: any = {
      user_id: user,
      number_of_plays: 1,
      time_spent_listening: data.track.duration.toString(),
      week_of_year: week_of_year,
      isUser: isUser
    }
    
    switch(type) {
      case "artist": itemData['artist'] = user; break;
      case "album": itemData['album'] = user; break;
      case "track": itemData['track'] = user; break;
      case "user": itemData['user'] = user; break;
    }

    await database.createDocument(databaseId, statsCollectionId, ID.unique(), itemData);
  }
};
