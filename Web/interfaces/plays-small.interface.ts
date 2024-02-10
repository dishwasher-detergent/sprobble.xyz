import { Models } from "appwrite";

export interface PlaySmall extends Models.Document {
  track_id: string;
  track_name: string;
  track_href: string;
  album_id: string;
  album_name: string;
  album_image: string;
  artist_name: string;
  user_id: string;
  user_name: string;
  user_avatar: string;
  played_at: Date;
}
