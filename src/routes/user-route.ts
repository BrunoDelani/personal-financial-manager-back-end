import { Router } from "express";
import userController from "../api/controllers/user-controller.js";
import { authMiddleware } from "../auth/auth-middleware.js";

const router = Router();


router
    .get(`/user`, userController.findUserByEmail)
    .post(`/user`, authMiddleware, userController.createUser);

export default router;