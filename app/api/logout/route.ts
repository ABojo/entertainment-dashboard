import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  cookies().delete("JWT");
  return NextResponse.json({ status: "success", message: "You have been logged out." });
}
