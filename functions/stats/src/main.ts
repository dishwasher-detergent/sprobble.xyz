import { Client, Databases } from "node-appwrite";
import { addStat } from "./utils/database.js";

type Context = {
  req: any;
  res: any;
  log: (msg: any) => void;
  error: (msg: any) => void;
};

export default async ({ req, res, log, error }: Context) => {
  const client = new Client();

  const database = new Databases(client);

  client
    .setEndpoint(process.env.APPWRITE_FUNCTION_ENDPOINT as string)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID as string)
    .setKey(process.env.APPWRITE_FUNCTION_API_KEY as string)
    .setSelfSigned(true);

  const data = req.body;

  if (!data) {
    error("No data found in event.");
    res.send("No data found in event.");
    return;
  }

  try {
    await addStat(database, data, data.user_id);
  } catch (err) {
    error("Error adding user stat");
    error(err);
  }

  try {
    await addStat(database, data, "global");
  } catch (err) {
    error("Error adding global stat");
    error(err);
  }

  res.send("Complete");
};
