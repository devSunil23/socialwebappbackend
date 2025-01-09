import express from "express";
import {
    follow,
    unfollow,
    getFollowers,
    getFollowing,
} from "../controllers/followController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to add a follow relationship
router.post("/follow", authenticateToken, follow);

// Route to remove a follow relationship
router.post("/unfollow", authenticateToken, unfollow);

// Route to get followers of a user
router.get("/followers/:followee_id", authenticateToken, getFollowers);

// Route to get users followed by a user
router.get("/following/:follower_id", authenticateToken, getFollowing);

export default router;
