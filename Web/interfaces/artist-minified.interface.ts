import { Models } from "appwrite";

export interface ArtistMinified extends Models.Document {
  name: string;
  number_of_plays: number;
  number_of_songs: number;
  number_of_albums: number;
}
