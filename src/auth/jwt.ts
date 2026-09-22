import jwt from "jsonwebtoken";
import "dotenv/config";
import { Types } from "mongoose";

const accessSecret = process.env.JWT_ACCESS_SECRET ?? "";
const refreshSecret = process.env.JWT_REFRESH_SECRET ?? "";

if (!accessSecret || !refreshSecret) {
  throw new Error("JWT secrets are not configured.");
}

export function generateAccessToken(userId: Types.ObjectId | string): string {
  return jwt.sign(
    {
      sub: userId,
    },
    accessSecret,
    {
      expiresIn: "15m",
    },
  );
}

export function generateRefreshToken(userId: Types.ObjectId | string): string {
  return jwt.sign(
    {
      sub: userId,
    },
    refreshSecret,
    {
      expiresIn: "30d",
    },
  );
}

export function verifyAccessToken(token: string): jwt.JwtPayload {
  return jwt.verify(token, accessSecret) as jwt.JwtPayload;
}

export function verifyRefreshToken(token: string): jwt.JwtPayload {
  return jwt.verify(token, refreshSecret) as jwt.JwtPayload;
}
