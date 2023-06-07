import { Models } from "appwrite";

export type Play = {
  user_id: string;
  played_at: string;
  track: Track;
  album: Album;
  artist: Artist[];
} & Models.Document;

export type Track = {
  id: string;
  name: string;
  href: string;
  popularity: number;
  explicit: boolean;
  duration: number;
  preview: string;
  album: Album;
  artist: Artist[];
} & Models.Document;

export type Album = {
  id: string;
  name: string;
  href: string;
  popularity: number;
  images: string[];
} & Models.Document;

export type Artist = {
  id: string;
  name: string;
  href: string;
  popularity: number;
  images: string[];
  genres: string[];
} & Models.Document;
