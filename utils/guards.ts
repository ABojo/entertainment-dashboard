import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./auth";

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
