import { Models } from "appwrite";

export interface AlbumMinified extends Models.Document {
  name: string;
  number_of_plays: number;
  number_of_songs: number;
  images: string[];
  artist: string;
}
