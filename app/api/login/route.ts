import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { passwordIsValid, generateJWT } from "../../../utils/auth";
import db from "../../../utils/db";

export async function POST(req: NextRequest) {
  const json = await req.json();

  if (!json.username || !json.password)
    return NextResponse.json({ status: "error", message: "You must provide both a username and password" });

  const user = await db.user.findFirst({
    where: {
      username: json.username,
    },
  });

  if (!user) return NextResponse.json({ status: "error", message: "We could not find a profile with that username" });

  const isValid = await passwordIsValid(json.password, user.password);

  if (!isValid) return NextResponse.json({ status: "error", message: "You did not enter the correct password" });

  const token = await generateJWT({ id: user.id, username: user.username });

  cookies().set("JWT", token, { httpOnly: true, secure: true, expires: Date.now() + 1000 * 60 * 60 * 24 * 30 });

  return NextResponse.json({ status: "success", token });
}
