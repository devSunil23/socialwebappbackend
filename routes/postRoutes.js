import express from "express";
import { createPost, getAllPosts } from "../controllers/postController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();
// Get all posts
router.get("/list", authenticateToken, getAllPosts);

// Create a new post
router.post("/create", authenticateToken, createPost);

export default router;
