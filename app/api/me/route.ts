import { NextRequest, NextResponse } from "next/server";
import db from "../../../utils/db";
import { getUserFromCookies } from "../../../utils/auth";

export async function GET(req: NextRequest) {
  const jwtData = getUserFromCookies(req);

  const user = await db.user.findFirst({
    where: {
      id: jwtData.id!,
    },
    select: {
      id: true,
      username: true,
    },
  });

  return NextResponse.json({ status: "success", data: user });
}
