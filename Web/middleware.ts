import { ssr } from "@/lib/ssr";
import { NextResponse } from "next/server";

export const middleware = ssr.authMiddleware((request) => {
  // if (!request.user) {
  //   return new Response("Unauthorized", {
  //     status: 401,
  //   });
  // }

  return NextResponse.next();
});

export const config = {
  matcher: "/account",
};
