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
  track: Track[];
  artist: Artist[];
} & Models.Document;

export type Artist = {
  id: string;
  name: string;
  href: string;
  popularity: number;
  images: string[];
  genres: string[];
  track: Track[];
  album: Album[];
} & Models.Document;

export type Stat = {
  number_of_plays: number;
  time_spent_listening: string;
  week_of_year: number;
  user_id: string;
  user: User;
} & Models.Document;

export type User = {
  user_id: string;
  name: string;
  stats: Stat[];
  created_at: string;
  authorized: boolean;
  refresh_token: string;
} & Models.Document;

export type TotalStats = {
  title: string;
  count: number;
} & Models.Document;