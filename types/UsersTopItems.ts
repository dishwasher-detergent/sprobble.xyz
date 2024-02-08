export type UsersTopTracks = {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: Track[];
};

export type Track = {
  album?: Album;
  artists?: Artists[];
  available_markets?: string[];
  disc_number?: number;
  duration_ms?: number;
  explicit?: boolean;
  external_ids?: ExternalIds;
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  is_playable?: boolean;
  linked_from?: any;
  restrictions?: Restrictions;
  name?: string;
  popularity?: number;
  preview_url?: string;
  track_number?: number;
  type?: string;
  uri?: string;
  is_local?: boolean;
};

export type Album = {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Images[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions?: Restrictions;
  type: string;
  uri: string;
  copyrights?: Copyrights;
  external_ids?: ExternalIds;
  genres?: string[];
  label?: string;
  popularity?: number;
  album_group?: string;
  artists: Artists[];
};

export type Artists = {
  external_urls?: ExternalUrls;
  followers?: Followers;
  genres?: string[];
  href?: string;
  id?: string;
  images?: Images[];
  name?: string;
  popularity?: number;
  type?: string;
  uri?: string;
};

export type ExternalIds = {
  isrc?: string;
  ean?: string;
  upc?: string;
};

export type ExternalUrls = {
  spotify: string;
};

export type Restrictions = {
  reason: string;
};

export type Images = {
  url: string;
  height: number | null;
  width: number | null;
};

export type Copyrights = {
  text: string;
  type: string;
};

export type Followers = {
  href: string | null;
  total: number;
};
