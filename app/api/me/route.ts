import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "../../../utils/auth";

export async function GET(req: NextRequest) {
  const user = await getCurrentUser(req);
  return NextResponse.json({ status: "success", data: user });
}
