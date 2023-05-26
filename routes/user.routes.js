import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  resetPassword,
  resetPasswordToken,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/create", createUser);
router.post("/login", loginUser);
router.post("/get-reset-code", resetPasswordToken);
router.post("/reset-password", resetPassword);
router.get("/logout", logoutUser);

export default router;
