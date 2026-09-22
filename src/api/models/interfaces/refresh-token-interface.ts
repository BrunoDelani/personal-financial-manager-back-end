import { Types } from "mongoose";

export interface IRefreshToken {
  userId: Types.ObjectId;
  tokenHash: string;
  expiresAt: Date;
  revokedAt: Date | null;
  replacedByTokenHash: string | null;
  ip?: string;
  userAgent?: string;
}
