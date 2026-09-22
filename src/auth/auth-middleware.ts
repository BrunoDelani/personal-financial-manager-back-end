import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { UnauthorizedError } from '../errors/unauthorized-error.js';

const accessSecret: string = process.env.JWT_ACCESS_SECRET ?? '';

if (!accessSecret) {
    throw new Error('JWT access secret is not configured.');
}

export interface AuthRequest extends Request {
    userId?: string;
}

export function authMiddleware(
    req: AuthRequest,
    _res: Response,
    next: NextFunction
) {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            throw new UnauthorizedError(
                'Authentication required.'
            );
        }

        const [type, token] = authorization.split(' ');

        if (type !== 'Bearer' || !token) {
            throw new UnauthorizedError(
                'Invalid authorization header.'
            );
        }

        const payload = jwt.verify(
            token,
            accessSecret
        ) as jwt.JwtPayload;

        if (!payload.sub) {
            throw new UnauthorizedError(
                'Invalid token.'
            );
        }

        req.userId = payload.sub;

        next();

    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return next(
                new UnauthorizedError('Invalid or malformed token.')
            );
        }

        next(error);
    }
}