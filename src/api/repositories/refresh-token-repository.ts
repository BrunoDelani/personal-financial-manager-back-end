import { IRefreshToken } from "../models/interfaces/refresh-token-interface.js";
import refreshTokenSchema from "../models/schemas/refresh-token-schema.js";

class RefreshTokenRepository {
    async create(
        payload: IRefreshToken
    ): Promise<IRefreshToken> {
        return refreshTokenSchema.create(payload);
    }

    async findByTokenHash(
        tokenHash: string
    ): Promise<IRefreshToken | null> {
        return refreshTokenSchema.findOne({ tokenHash });
    }

    async revokeByTokenHash(
        tokenHash: string
    ): Promise<void> {
        await refreshTokenSchema.updateOne(
            {
                tokenHash,
                revokedAt: null
            },
            {
                $set: {
                    revokedAt: new Date()
                }
            }
        );
    }
}

export default new RefreshTokenRepository();