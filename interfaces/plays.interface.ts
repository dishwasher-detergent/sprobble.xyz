import { User } from "@/interfaces/user.interface";
import { Album } from "@/interfaces/album.interface";
import { Artist } from "@/interfaces/artist.interface";
import { Track } from "@/interfaces/track.interface";
import { Models } from "appwrite";

export interface Play extends Models.Document {
  played_at: Date;
  user_id: string;
  track: Track;
  album: Album;
  artist: Artist[];
  user: User;
}
