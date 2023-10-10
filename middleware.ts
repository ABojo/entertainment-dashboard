import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "./utils/auth";
import { cookies } from "next/headers";

export const config = {
  matcher: ["/", "/api/me"],
};

export async function middleware(req: NextRequest) {
  const cookie = cookies().get("JWT");
  let jwtIsValid = cookie && (await verifyJWT(cookie.value));

  //allow access to route if they have a valid JWT in their cookies
  if (jwtIsValid) return NextResponse.next();

  const isApi = req.nextUrl.pathname.startsWith("/api");

  //respond according to api or front end route
  if (isApi) {
    return NextResponse.json(
      { status: "error", message: "You must be authenticated to access this route" },
      { status: 401 }
    );
  } else {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}
