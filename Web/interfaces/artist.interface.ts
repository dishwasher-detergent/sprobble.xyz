import { Album } from "@/interfaces/album.interface";
import { Play } from "@/interfaces/plays.interface";
import { Track } from "@/interfaces/track.interface";
import { Models } from "appwrite";
import { Stat } from "./stats.interface";

export interface Artist extends Models.Document {
  href: string;
  name: string;
  genres: string[];
  popularity: string[];
  images: string[];
  track: Track[];
  album: Album[];
  plays: Play[];
  stats: Stat[];
}
