import { Models } from "appwrite";

export interface TotalStat extends Models.Document {
  title: string;
  count: number;
}
