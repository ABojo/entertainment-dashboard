import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./auth";
import UserResponse from "../types/UserResponse";

export function addAuthGuard<T>(
  routeHandler: (req: NextRequest, user: UserResponse, config?: T) => Promise<NextResponse>
) {
  return async function (req: NextRequest, params?: T) {
    const user = await getCurrentUser(req);

    if (!user) {
      return NextResponse.json(
        { status: "error", message: "You must be logged in to perform that action! test" },
        { status: 401 }
      );
    }

    return await routeHandler(req, user, params);
  };
}

export function addAdminGuard(routeHandler: (req: NextRequest) => Promise<NextResponse>) {
  return async function (req: NextRequest) {
    const user = await getCurrentUser(req);

    if (!user || user.type !== "ADMIN") {
      return NextResponse.json(
        { status: "error", message: "Only admins are permitted to perform that action!" },
        { status: 401 }
      );
    }

    return await routeHandler(req);
  };
}
