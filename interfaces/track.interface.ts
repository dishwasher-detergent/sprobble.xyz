import { Album } from "@/interfaces/album.interface";
import { Artist } from "@/interfaces/artist.interface";
import { Play } from "@/interfaces/plays.interface";
import { Stat } from "@/interfaces/stats.interface";
import { Models } from "appwrite";

export interface Track extends Models.Document {
  name: string;
  href: string;
  popularity: number;
  duration: number;
  explicit: boolean;
  preview: string;
  artist: Artist[];
  album: Album;
  plays: Play[];
  stats: Stat[];
}
