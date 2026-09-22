import { NextFunction, Request, Response } from 'express';
import authService from '../services/auth-service.js';

class AuthController {
    async authenticate(req: Request, res: Response, next: NextFunction) {
        try {
            const userAgent = req.get('user-agent');
            const response = await authService.authenticate(req.body, req.ip ?? '', userAgent ?? '');

            res.cookie(
                'refreshToken',
                response.refreshToken,
                {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                    maxAge: 30 * 24 * 60 * 60 * 1000
                }
            );

            return res.status(200).json({ "accessToken": response.accessToken });
        } catch (error) {
            next(error);
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await authService.refresh(req.cookies.refreshToken);

            return res.json({
                "accessToken": response
            });
        } catch (error) {
            next(error);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            await authService.logout(req.cookies.refreshToken);

            res.clearCookie('refreshToken');

            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new AuthController();