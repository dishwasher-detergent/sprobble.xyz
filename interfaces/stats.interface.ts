import { Album } from "@/interfaces/album.interface";
import { Artist } from "@/interfaces/artist.interface";
import { Track } from "@/interfaces/track.interface";
import { Models } from "appwrite";
import { User } from "./user.interface";

export interface Stat extends Models.Document {
  number_of_plays: number;
  user_id: string;
  time_spent_listening: string;
  week_of_year: number;
  user: User;
  track: Track;
  album: Album;
  artist: Artist;
}
