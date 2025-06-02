import express from "express";
import { body } from "express-validator";
import { upload } from "../middleware/cloudinaryUpload.js";
import * as userController from "../controllers/user.controller.js";

const router = express.Router();

router.post(
  "/register",
  upload.single('image'),
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("username")
      .isLength({ min: 3 })
      .withMessage("User name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.userRegister
);

router.get("/verify-email", userController.verifyEmail);

export default router;
