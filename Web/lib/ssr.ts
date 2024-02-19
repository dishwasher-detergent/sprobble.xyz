import { ENDPOINT, PROJECT_ID } from "@/lib/constants";
import { AppwriteNextServer } from "@/lib/middleware";

export const ssr = new AppwriteNextServer({
  url: ENDPOINT,
  projectId: PROJECT_ID,
  key: process.env.API_KEY as string,
});
