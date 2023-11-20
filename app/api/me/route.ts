import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "../../../utils/auth";
import { addAdminGuard } from "../../../utils/guards";

export const GET = async function (req: NextRequest) {
  const user = await getCurrentUser(req);

  //this line makes the JWT cookie accessible in production(I have ZERO idea why)
  req.headers.entries();

  return NextResponse.json({ status: "success", data: user });
};
