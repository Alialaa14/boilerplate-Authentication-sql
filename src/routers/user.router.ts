import { Router } from "express";
import { isAuthenticated } from "../Middlewares/isAuthenticated.ts";
import { isAuthorized } from "../Middlewares/isAuthorized.ts";
import {
  register,
  login,
  logout,
  resetPassword,
  forgotPassword,
  verifyOtp,
  updateUser,
} from "../Controllers/user.controllers.ts";
import { upload } from "../utils/multer.ts";

const router = Router();

router.post("/register", upload.single("picture"), register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);
router.post("/logout", isAuthenticated, logout);
router.patch(
  "/update-profile",
  isAuthenticated,
  upload.single("picture"),
  updateUser,
);

export default router;
