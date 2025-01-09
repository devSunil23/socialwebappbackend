import express from "express";
import {
    addLike,
    removeLike,
    getLikesForPost,
    getLikesByUser,
} from "../controllers/likeController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to add a like
router.post("/addLike", authenticateToken, addLike);

// Route to remove a like
router.post("/removeLike", authenticateToken, removeLike);

// Route to get likes for a post
router.get("/likes/post/:post_id", authenticateToken, getLikesForPost);

// Route to get likes by a user
router.get("/likes/user/:user_id", authenticateToken, getLikesByUser);

export default router;
