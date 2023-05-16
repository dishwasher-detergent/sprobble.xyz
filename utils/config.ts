type ServerTypes = {
  endpoint: string;
  project: string;
  hostname: string;
  appwrite_hostname: string;
};

export const Server: ServerTypes = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT
    ? process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT
    : "",
  project: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID
    ? process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID
    : "",
  hostname: process.env.NEXT_PUBLIC_APP_HOSTNAME
    ? process.env.NEXT_PUBLIC_APP_HOSTNAME
    : "",
  appwrite_hostname: process.env.NEXT_PUBLIC_APP_APPWRITE_HOSTNAME
    ? process.env.NEXT_PUBLIC_APP_APPWRITE_HOSTNAME
    : "",
};
