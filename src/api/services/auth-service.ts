import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../auth/jwt.js";
import { UnauthorizedError } from "../../errors/unauthorized-error.js";
import { hashToken } from "../../utils/hash.js";
import { verifyPassword } from "../../utils/password.js";
import { IUserAutenticateInput, IUserAutenticateOutput } from "../models/interfaces/user-interface.js";
import refreshTokenRepository from "../repositories/refresh-token-repository.js";
import userRepository from "../repositories/user-repository.js";

class AuthService {
    async authenticate(payload: IUserAutenticateInput, ip: string, userAgent: string): Promise<IUserAutenticateOutput> {
        const user = await userRepository.login(payload.email);

        if (!user) {
            throw new UnauthorizedError('Invalid email or password.');
        }

        const passwordValid = await verifyPassword(
            user.passwordHash,
            payload.password,
        );

        if (!passwordValid) {
            throw new UnauthorizedError('Invalid email or password.');
        }

        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);
        const tokenHash = hashToken(refreshToken);

        await refreshTokenRepository.create({
            userId: user.id,
            tokenHash,
            expiresAt: new Date(
                Date.now() + (30 * 24 * 60 * 60 * 1000)
            ),
            revokedAt: null,
            replacedByTokenHash: null,
            ip: ip,
            userAgent: userAgent
        });

        return {
            accessToken,
            refreshToken
        };
    }

    async refresh(refreshToken: any): Promise<string> {

        if (!refreshToken) {
            throw new UnauthorizedError(
                'Refresh token required.'
            );
        }

        const payload = verifyRefreshToken(refreshToken);

        if (!payload.sub) {
            throw new UnauthorizedError(
                'Invalid refresh token.'
            );
        }

        const response = await refreshTokenRepository.findByTokenHash(hashToken(refreshToken));

        if (!response || response.revokedAt) {
            throw new UnauthorizedError(
                'Invalid refresh token.'
            );
        }

        const accessToken = generateAccessToken(payload.sub);

        return accessToken;
    }

    async logout(refreshToken: any): Promise<void> {
        if (!refreshToken) {
            throw new UnauthorizedError(
                'Refresh token required.'
            );
        }

        const payload = verifyRefreshToken(refreshToken);

        if (!payload.sub) {
            throw new UnauthorizedError(
                'Invalid refresh token.'
            );
        }

        const tokenHash = hashToken(refreshToken);

        const response = await refreshTokenRepository.findByTokenHash(tokenHash);

        if (!response || response.revokedAt) {
            throw new UnauthorizedError(
                'Invalid refresh token.'
            );
        }

        await refreshTokenRepository.revokeByTokenHash(tokenHash);

    }
}

export default new AuthService();