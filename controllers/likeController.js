import { db } from "../config/db.js";

// Add a like
export const addLike = async (req, res) => {
    const { post_id } = req.body;
    const { userId: user_id } = req.user;
    try {
        const [result] = await db.execute(
            "INSERT INTO likes (user_id, post_id, created_at) VALUES (?, ?, NOW())",
            [user_id, post_id]
        );
        res.status(201).json({
            message: "Like added successfully",
            likeId: result.insertId,
        });
    } catch (error) {
        res.status(500).json({ message: "Error adding like", error });
    }
};

// Remove a like
export const removeLike = async (req, res) => {
    const { post_id } = req.body;
    const { userId: user_id } = req.user;
    try {
        await db.execute(
            "DELETE FROM likes WHERE user_id = ? AND post_id = ?",
            [user_id, post_id]
        );
        res.status(200).json({ message: "Like removed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error removing like", error });
    }
};

// Get likes for a post
export const getLikesForPost = async (req, res) => {
    const { post_id } = req.params;
    try {
        const [likes] = await db.execute(
            "SELECT * FROM likes WHERE post_id = ?",
            [post_id]
        );
        res.status(200).json(likes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching likes", error });
    }
};

// Get likes by a user
export const getLikesByUser = async (req, res) => {
    const { user_id } = req.params;
    try {
        const [likes] = await db.execute(
            "SELECT * FROM likes WHERE user_id = ?",
            [user_id]
        );
        res.status(200).json(likes);
    } catch (error) {
        res.status(500).json({ message: "Error fetching likes", error });
    }
};
