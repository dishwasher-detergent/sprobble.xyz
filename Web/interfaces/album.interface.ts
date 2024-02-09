import { Artist } from "@/interfaces/artist.interface";
import { Play } from "@/interfaces/plays.interface";
import { Stat } from "@/interfaces/stats.interface";
import { Track } from "@/interfaces/track.interface";
import { Models } from "appwrite";

export interface Album extends Models.Document {
  href: string;
  name: string;
  genres: string[];
  popularity: number;
  images: string[];
  track: Track[];
  artist: Artist[];
  plays: Play[];
  stats: Stat[];
}
