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

  const body = req.body;
  const data = JSON.parse(body);

  if (!data) {
    error("No data found in event.");
    res.send("No data found in event.");
    return;
  }

  try {
    await addStat(database, data.$collectionId);
  } catch (err) {
    log("Error adding total stat");
    error(err);
  }

  return res.send("Complete");
};
