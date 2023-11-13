import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "../../../utils/auth";
import { addAdminGuard } from "../../../utils/guards";

export const GET = addAdminGuard(async function (req: NextRequest) {
  const user = await getCurrentUser(req);
  return NextResponse.json({ status: "success", data: user });
});
