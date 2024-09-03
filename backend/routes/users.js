import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../db.js";
import { authenticateToken } from "../utils/auth.js";

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const { username, email, password, language, country } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
      "INSERT INTO users (username, email, password_hash, language, country) VALUES ($1, $2, $3, $4, $5) RETURNING user_id",
      [username, email, hashedPassword, language, country],
    );
    res.status(201).json({ userId: result.rows[0].user_id });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      if (await bcrypt.compare(password, user.password_hash)) {
        const token = jwt.sign(
          { userId: user.user_id },
          process.env.JWT_SECRET,
          { expiresIn: "24h" },
        );
        res.json({ token });
      } else {
        res.status(400).json({ message: "Invalid credentials" });
      }
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:userId", authenticateToken, async (req, res, next) => {
  try {
    const result = await db.query(
      "SELECT user_id, username, email, profile_picture, language, country, created_at, last_login FROM users WHERE user_id = $1",
      [req.params.userId],
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:userId", authenticateToken, async (req, res, next) => {
  try {
    const { username, email, language, country, profile_picture } = req.body;
    const result = await db.query(
      "UPDATE users SET username = $1, email = $2, language = $3, country = $4, profile_picture = $5 WHERE user_id = $6 RETURNING user_id",
      [username, email, language, country, profile_picture, req.params.userId],
    );
    if (result.rows.length > 0) {
      res.json({ message: "User updated successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
