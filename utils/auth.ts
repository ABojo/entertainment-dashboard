import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function passwordIsValid(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

export async function generateJWT(userData: { id: string; username: string }) {
  const token = await jwt.sign(userData, process.env.JWT_SECRET as string);

  return token;
}
