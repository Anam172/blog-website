import express from "express";
import { googleAuth, register, login } from "../controllers/authController.js";
import { body, validationResult } from "express-validator"; // ✅ Import express-validator

const router = express.Router();

// ✅ Middleware to handle validation errors
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// ✅ User Signup Validation
router.post(
  "/signup",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").trim().isEmail().withMessage("Invalid email format").toLowerCase(),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    validateRequest, // ✅ Ensures validation errors are handled
  ],
  register
);

// ✅ User Login Validation
router.post(
  "/login",
  [
    body("email").trim().isEmail().withMessage("Invalid email format").toLowerCase(),
    body("password").notEmpty().withMessage("Password is required"),
    validateRequest, // ✅ Ensures validation errors are handled
  ],
  login
);

// ✅ Google Authentication Route
router.post("/google-auth", googleAuth);

export default router;
