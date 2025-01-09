import { db } from "../config/db.js";
// Get all posts
export const getAllPosts = async (req, res) => {
    try {
        const user_id = req.user.userId;

        const query = `
            SELECT 
                posts.id, 
                posts.title, 
                posts.content,
                posts.user_id, 
                COUNT(likes.id) AS total_likes,
                CASE 
                    WHEN EXISTS (
                        SELECT 1 
                        FROM likes 
                        WHERE likes.post_id = posts.id AND likes.user_id = ?
                    ) 
                    THEN TRUE 
                    ELSE FALSE 
                END AS liked_by_user,
                COUNT(follows.follower_id) AS total_followers,
                CASE 
                    WHEN EXISTS (
                        SELECT 1 
                        FROM follows 
                        WHERE follows.followee_id = posts.user_id AND follows.follower_id = ?
                    ) 
                    THEN TRUE 
                    ELSE FALSE 
                END AS followed_by_user
            FROM posts
            LEFT JOIN likes ON posts.id = likes.post_id
            LEFT JOIN follows ON posts.user_id = follows.followee_id
            GROUP BY posts.id
        `;

        const [posts] = await db.query(query, [user_id, user_id]);
        res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// Create a new post
export const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res
                .status(400)
                .json({ message: "Title and content are required." });
        }

        await db.query(
            "INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)",
            [title, content, req.user.userId]
        );

        res.status(201).json({ message: "Post created successfully." });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};
