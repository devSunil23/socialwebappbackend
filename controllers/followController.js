import { db } from "../config/db.js";

// Add a follow relationship
export const follow = async (req, res) => {
    const { followee_id } = req.body;
    const { userId: follower_id } = req.user;
    try {
        const [result] = await db.execute(
            "INSERT INTO follows (follower_id, followee_id, created_at) VALUES (?, ?, NOW())",
            [follower_id, followee_id]
        );
        res.status(201).json({
            message: "Followed successfully",
            followId: result.insertId,
        });
    } catch (error) {
        res.status(500).json({ message: "Error adding follow", error });
    }
};

// Remove a follow relationship
export const unfollow = async (req, res) => {
    const { follower_id, followee_id } = req.body;
    try {
        await db.execute(
            "DELETE FROM follows WHERE follower_id = ? AND followee_id = ?",
            [follower_id, followee_id]
        );
        res.status(200).json({ message: "Unfollowed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error removing follow", error });
    }
};

// Get followers of a user
export const getFollowers = async (req, res) => {
    const { followee_id } = req.params;
    try {
        const [followers] = await db.execute(
            "SELECT * FROM follows WHERE followee_id = ?",
            [followee_id]
        );
        res.status(200).json(followers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching followers", error });
    }
};

// Get users followed by a user
export const getFollowing = async (req, res) => {
    const { follower_id } = req.params;
    try {
        const [following] = await db.execute(
            "SELECT * FROM follows WHERE follower_id = ?",
            [follower_id]
        );
        res.status(200).json(following);
    } catch (error) {
        res.status(500).json({ message: "Error fetching following", error });
    }
};
