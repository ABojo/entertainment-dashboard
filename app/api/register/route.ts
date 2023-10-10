import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { hashPassword, generateJWT } from "../../../utils/auth";
import db from "../../../utils/db";
import validators from "../../../utils/validators";

export async function POST(req: NextRequest) {
  const json = await req.json();

  if (!json.username || !json.password) {
    return NextResponse.json({ status: "error", message: "You must provide a username and password." });
  }

  if (!validators.password(json.password)) {
    return NextResponse.json({
      status: "error",
      message: "You must provide a password that is at least 6 characters long.",
    });
  }

  const currentUser = await db.user.findFirst({
    where: {
      username: json.username,
    },
  });

  if (currentUser) {
    return NextResponse.json({
      status: "error",
      message: "Sorry, that username already exists.",
    });
  }

  const hashedPassword = await hashPassword(json.password);

  const newUser = await db.user.create({ data: { username: json.username, password: hashedPassword } });

  const token = await generateJWT({ id: newUser.id, username: newUser.username });

  cookies().set("JWT", token, { httpOnly: true, secure: true, expires: Date.now() + 1000 * 60 * 60 * 24 * 30 });

  return NextResponse.json({ status: "success", data: token }, { status: 201 });
}
