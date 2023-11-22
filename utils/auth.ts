import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify, decodeJwt } from "jose";
import { NextRequest } from "next/server";
import UserResponse from "../types/UserResponse";
import db from "../utils/db";

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function passwordIsValid(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

export async function generateJWT(userData: { id: string; username: string }) {
  const token = await new SignJWT(userData)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));

  return token;
}

export async function verifyJWT(token: string) {
  const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));

  if (payload) return true;

  return false;
}

export async function getCurrentUser(req: NextRequest): Promise<UserResponse | null> {
  const cookie = req.cookies.get("JWT");

  //if no jwt is present in cookies, or if jwt isnt valid
  if (!cookie || !(await verifyJWT(cookie.value))) return null;

  const jwtData = decodeJwt(cookie.value);

  const user: UserResponse | null = await db.user.findFirst({
    where: {
      id: jwtData.id!,
    },
    select: {
      id: true,
      username: true,
      type: true,
    },
  });

  return user;
}
