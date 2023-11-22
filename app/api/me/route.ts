import { NextResponse } from "next/server";
import { addAuthGuard } from "../../../utils/guards";

export const GET = addAuthGuard(async function (req, currentUser) {
  //this line makes the JWT cookie accessible in production(I have ZERO idea why)
  req.headers.entries();

  return NextResponse.json({ status: "success", data: currentUser });
});
