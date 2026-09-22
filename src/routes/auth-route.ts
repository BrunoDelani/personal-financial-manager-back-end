import { Router } from "express";
import authController from "../api/controllers/auth-controller.js";

const router = Router();

router
  .post(`/auth/login`, authController.authenticate)
  .post(`/auth/refresh`, authController.refresh)
  .post(`/auth/logout`, authController.logout);

export default router;
