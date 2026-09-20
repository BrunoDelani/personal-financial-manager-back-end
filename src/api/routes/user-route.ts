import { Router } from "express";
import userController from "../controllers/user-controller.js";

const router = Router();

const urlBaseRoute = '/api';

router
    .post(`${urlBaseRoute}/login`, userController.authenticateUser)
    .get(`${urlBaseRoute}/user`, userController.findUserByEmail)
    .post(`${urlBaseRoute}/user`, userController.createUser);

export default router;