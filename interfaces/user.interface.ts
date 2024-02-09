import { Stat } from "@/interfaces/stats.interface";
import { Models } from "appwrite";

export interface User extends Models.Document {
  name: string;
  user_id: string;
  authorized: boolean;
  avatar: string;
  refresh_token: string;
  created_at: Date;
  stats: Stat[];
}
