import { NextFunction, Request, Response } from 'express';
import userService from "../services/user-service.js";

class UserController {
    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await userService.createUser(req.body)
            return res.status(201).json(response);
        } catch (error) {
            next(error);
        }

    }

    async findUserByEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await userService.findUserByEmail(req.body.email)
            return res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }
}

export default new UserController();