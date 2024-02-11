import { Models } from "appwrite";

export interface TrackMinified extends Models.Document {
  name: string;
  artist: string;
  album_id: string;
  album_name: string;
  images: string[];
  number_of_plays: number;
}
