import { DefaultSession } from "next-auth";

export interface MySession extends Omit<DefaultSession, "user"> {
  user?: MyUser;
  expires: string;
}

interface MyUser {
  name?: string | null;
  email?: string | null;
  picture?: string | null;
  image?: string | null;
  accessToken?: string | null;
}
