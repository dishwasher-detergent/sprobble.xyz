import { Server } from "@/utils/config";

export async function POST(req: any) {
  let request;

  if (req.headers.get("email") && req.headers.get("password")) {
    request = await fetch(Server.endpoint + "/account/sessions/email", {
      method: "POST",
      headers: {
        "x-appwrite-project": Server.project,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: req.headers.get("email"),
        password: req.headers.get("password"),
      }),
    });
  } else {
    request = await fetch(Server.endpoint + "/account/sessions/anonymous", {
      method: "POST",
      headers: {
        "x-appwrite-project": Server.project,
        "Content-Type": "application/json",
      },
    });
  }

  const response = await request.json();

  const newHostname =
    Server.hostname === "localhost" ? Server.hostname : "." + Server.hostname;

  const cookie = (request.headers.get("set-cookie") ?? "")
    .split("." + Server.appwrite_hostname)
    .join(newHostname);

  return new Response(response, {
    status: 200,
    headers: {
      "Set-Cookie": cookie,
    },
  });
}
