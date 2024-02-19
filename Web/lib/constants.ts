export const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000";
export const SSR_HOSTNAME = process.env.NEXT_PUBLIC_SSR_HOSTNAME as string;
export const APPWRITE_HOSTNAME = process.env
  .NEXT_PUBLIC_APPWRITE_HOSTNAME as string;
export const ENDPOINT =
  process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1";
export const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string;
export const DATABASE_ID = process.env.NEXT_PUBLIC_DATABASE_ID as string;

// Collections
export const TOTAL_STATS_COLLECTION_ID = process.env
  .NEXT_PUBLIC_TOTAL_STATS_COLLECTION_ID as string;
export const STATS_COLLECTION_ID = process.env
  .NEXT_PUBLIC_STATS_COLLECTION_ID as string;
export const USER_COLLECTION_ID = process.env
  .NEXT_PUBLIC_USER_COLLECTION_ID as string;
export const PLAYS_COLLECTION_ID = process.env
  .NEXT_PUBLIC_PLAYS_COLLECTION_ID as string;
export const PLAYS_MINIFIED_COLLECTION_ID = process.env
  .NEXT_PUBLIC_PLAYS_MINIFIED_COLLECTION_ID as string;
export const TRACK_COLLECTION_ID = process.env
  .NEXT_PUBLIC_TRACK_COLLECTION_ID as string;
export const TRACK_MINIFIED_COLLECTION_ID = process.env
  .NEXT_PUBLIC_TRACK_MINIFIED_COLLECTION_ID as string;
export const ALBUM_COLLECTION_ID = process.env
  .NEXT_PUBLIC_ALBUM_COLLECTION_ID as string;
export const ALBUM_MINIFIED_COLLECTION_ID = process.env
  .NEXT_PUBLIC_ALBUM_MINIFIED_COLLECTION_ID as string;
export const ARTIST_COLLECTION_ID = process.env
  .NEXT_PUBLIC_ARTIST_COLLECTION_ID as string;
export const ARTIST_MINIFIED_COLLECTION_ID = process.env
  .NEXT_PUBLIC_ARTIST_MINIFIED_COLLECTION_ID as string;

// Buckets
export const AVATARS_BUCKET_ID = process.env
  .NEXT_PUBLIC_AVATARS_BUCKET_ID as string;
