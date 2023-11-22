import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "./utils/auth";
import { cookies } from "next/headers";

export const config = {
  matcher: ["/", "/tv", "/movies", "/bookmarks", "/account"],
};

export async function middleware(req: NextRequest) {
  const cookie = cookies().get("JWT");
  let jwtIsValid = cookie && (await verifyJWT(cookie.value));

  if (jwtIsValid) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/login";
  return NextResponse.redirect(url);
}
