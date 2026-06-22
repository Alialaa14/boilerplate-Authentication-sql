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
import { validationMiddleware } from "../Middlewares/validationMiddleware.ts";
import {
  registerSchema,
  loginSchema,
  verifyOtpSchema,
  forgotPassowrdSchema,
  resetpasswordSchema,
  updateProfileSchema,
} from "../validationSchemas/userValidationSchema.ts";

const router = Router();

router.post(
  "/register",
  upload.single("picture"),
  validationMiddleware(registerSchema),
  register,
);
router.post("/login", validationMiddleware(loginSchema), login);
router.post(
  "/forgot-password",
  validationMiddleware(forgotPassowrdSchema),
  forgotPassword,
);
router.post("/verify-otp", validationMiddleware(verifyOtpSchema), verifyOtp);
router.post(
  "/reset-password",
  validationMiddleware(resetpasswordSchema),
  resetPassword,
);
router.post("/logout", isAuthenticated, logout);
router.patch(
  "/update-profile",
  isAuthenticated,
  upload.single("picture"),
  validationMiddleware(updateProfileSchema),
  updateUser,
);

export default router;
