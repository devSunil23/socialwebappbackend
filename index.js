// Main Server File: index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import likeRoutes from "./routes/likeRoutes.js";
import followRoutes from "./routes/followRoutes.js";
import { db } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Test database connection
db.getConnection()
    .then(() => console.log("Connected to MySQL database"))
    .catch((err) => console.error("Database connection failed:", err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/follows", followRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
