import {
  APPWRITE_HOSTNAME,
  ENDPOINT,
  PROJECT_ID,
  SSR_HOSTNAME,
} from "@/lib/constants";
import { NextResponse } from "next/server";
import * as setCookie from "set-cookie-parser";

export async function POST(request: Request) {
  const response = await fetch(
    `${ENDPOINT}/account/sessions/oauth2/spotify?success=https%3A%2F%2Fsprobble.xyz%3A3000%2Fsetup&failure=https%3A%2F%2Fsprobble.xyz%3A3000&scopes%5B0%5D=user-read-currently-playing&scopes%5B1%5D=user-read-recently-played&scopes%5B2%5D=user-read-email&scopes%5B3%5D=user-read-private&project=sprobble`,
    {
      method: "GET",
      headers: {
        "x-appwrite-project": PROJECT_ID,
      },
    },
  );

  const json = await response.json();

  if (json.code >= 400) {
    return NextResponse.json(
      { message: json.message },
      {
        status: 400,
      },
    );
  }

  const ssrHostname =
    SSR_HOSTNAME === "localhost" ? SSR_HOSTNAME : "." + SSR_HOSTNAME;
  const appwriteHostname =
    APPWRITE_HOSTNAME === "localhost"
      ? APPWRITE_HOSTNAME
      : "." + APPWRITE_HOSTNAME;

  const cookiesStr = (response.headers.get("set-cookie") ?? "")
    .split(appwriteHostname)
    .join(ssrHostname);

  const cookiesArray = setCookie.splitCookiesString(cookiesStr);
  const cookiesParsed = cookiesArray.map((cookie: any) =>
    setCookie.parseString(cookie),
  );

  const nextJsResponse = NextResponse.json(json);

  for (const cookie of cookiesParsed) {
    nextJsResponse.cookies.set(cookie.name, cookie.value, {
      domain: cookie.domain,
      secure: cookie.secure,
      sameSite: cookie.sameSite as any,
      path: cookie.path,
      maxAge: cookie.maxAge,
      httpOnly: cookie.httpOnly,
      expires: cookie.expires,
    });
  }

  return nextJsResponse;
}
