import { MySession } from "@/types/Session";

export const isAuthenticated = async (session: MySession | null) => {
  if (
    !session ||
    Math.floor(Date.now()) >= (session.user as any).expires_at * 1000
  ) {
    return false;
  }
  return true;
};
