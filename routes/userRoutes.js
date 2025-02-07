// User Routes: userRoutes.js
import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

// Route for user registration
router.post("/register", registerUser);

// Route for user login
router.post("/login", loginUser);

export default router;
