import { db } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Route for user registration
export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res
                .status(400)
                .json({ message: "All fields are required." });
        }

        // Check if user already exists
        const [userExists] = await db.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );
        if (userExists.length > 0) {
            return res
                .status(400)
                .json({ message: "User already exists with this email." });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert user into database
        await db.query(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            [username, email, hashedPassword]
        );

        res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
        console.error("Error during user registration:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// Route for user login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required." });
        }

        // Check if user exists
        const [user] = await db.query("SELECT * FROM users WHERE email = ?", [
            email,
        ]);
        if (user.length === 0) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(
            password,
            user[0].password
        );
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        // Generate JWT
        const token = jwt.sign({ userId: user[0].id }, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });

        res.status(200).json({
            message: "Login successful.",
            token,
            userId: user[0].id,
            userName: user[0].username,
        });
    } catch (error) {
        console.error("Error during user login:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};
