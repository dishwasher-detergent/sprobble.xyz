import type {
  AppwriteNextMiddlewareHandler,
  AppwriteServerConfiguration,
} from "@/types/middleware";
import type { Models } from "appwrite";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import type { RequestCookies } from "next/dist/server/web/spec-extension/cookies";

export * from "@/types/middleware";

export class AppwriteNextServer {
  private configuration: AppwriteServerConfiguration;

  constructor(configuration: AppwriteServerConfiguration) {
    this.configuration = configuration;
  }

  authMiddleware<Preferences extends Models.Preferences>(
    handler: AppwriteNextMiddlewareHandler<Preferences>,
  ): AppwriteNextMiddlewareHandler<Preferences> {
    return async (request) => {
      const cookieName = `a_session_sprobble`;
      const token = request.cookies.get("a_session_sprobble")?.value;

      const allCookies = request.cookies.getAll();

      console.log(allCookies);

      console.log(cookieName);
      console.log(token);

      if (!token) {
        return handler(request);
      }

      try {
        const account = await this.getUser<Preferences>(request.cookies);

        console.log(account);

        request.user = account || undefined;

        return handler(request);
      } catch (error) {
        console.error(error);

        return handler(request);
      }
    };
  }

  async getUser<Preferences extends Models.Preferences>(
    cookies: RequestCookies | ReadonlyRequestCookies,
  ) {
    try {
      const cookieName = `a_session_${this.configuration.projectId.toLowerCase()}_legacy`;
      const token = cookies.get(cookieName)?.value ?? "";

      console.log(cookieName);
      console.log(token);

      console.log(this.configuration);

      const response = await fetch(`${this.configuration.url}/account`, {
        method: "GET",
        credentials: "include",
        headers: {
          Cookie: `${cookieName}=${token}`,
          "x-appwrite-project": this.configuration.projectId,
        },

        cache: "no-store",
      });

      const json = (await response.json()) as any;

      if (json.code) {
        return null;
      }

      return json as Models.User<Preferences>;
    } catch (error) {
      return null;
    }
  }
}
