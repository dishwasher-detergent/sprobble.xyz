export const HOSTNAME = process.env.NEXT_PUBLIC_HOSTNAME || "cloud.appwrite.io";
export const SSR_HOSTNAME = process.env.NEXT_PUBLIC_SSR_HOSTNAME || "localhost";
export const ENDPOINT =
  process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1";
export const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string;
export const DATABASE_ID = process.env.NEXT_PUBLIC_DATABASE_ID as string;

// Collections
export const TRACK_COLLECTION_ID = "track";
export const ARTIST_COLLECTION_ID = "artist";
export const ALBUM_COLLECTION_ID = "album";
export const USER_COLLECTION_ID = "user";
export const STATS_COLLECTION_ID = "stats";
export const TOTAL_STATS_COLLECTION_ID = "total_stats";
export const PLAYS_COLLECTION_ID = "plays";

// Buckets
export const AVATAR_BUCKET_ID = "avatars";
