// import express from "express";
// import db from "../db.js";
// import { authenticateToken } from "../utils/auth.js";
// import { startSession, endSession } from "../utils/websocketHandler.js";

// const router = express.Router();

// router.post("/", authenticateToken, async (req, res, next) => {
//   try {
//     const {
//       session_title,
//       description,
//       language,
//       is_private,
//       is_temporary,
//       auto_delete,
//     } = req.body;
//     const result = await db.query(
//       "INSERT INTO live_sessions (host_user_id, session_title, description, language, is_private, is_temporary, auto_delete, started_at) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW()) RETURNING session_id",
//       [
//         req.user.userId,
//         session_title,
//         description,
//         language,
//         is_private,
//         is_temporary,
//         auto_delete,
//       ],
//     );
//     const sessionId = result.rows[0].session_id;
//     await startSession(sessionId);
//     res.status(201).json({ sessionId });
//   } catch (error) {
//     next(error);
//   }
// });

// router.post("/:sessionId/end", authenticateToken, async (req, res, next) => {
//   try {
//     const result = await db.query(
//       "UPDATE live_sessions SET ended_at = NOW() WHERE session_id = $1 AND host_user_id = $2 RETURNING *",
//       [req.params.sessionId, req.user.userId],
//     );
//     if (result.rows.length > 0) {
//       await endSession(req.params.sessionId);
//       res.json({ message: "Session ended successfully" });
//     } else {
//       res
//         .status(404)
//         .json({ message: "Session not found or user not authorized" });
//     }
//   } catch (error) {
//     next(error);
//   }
// });

// router.get("/active", async (req, res, next) => {
//   try {
//     const result = await db.query(
//       "SELECT * FROM live_sessions WHERE ended_at IS NULL",
//     );
//     res.json(result.rows);
//   } catch (error) {
//     next(error);
//   }
// });

// router.post("/:sessionId/join", authenticateToken, async (req, res, next) => {
//   try {
//     const result = await db.query(
//       "INSERT INTO participants (session_id, user_id, joined_at) VALUES ($1, $2, NOW()) RETURNING participant_id",
//       [req.params.sessionId, req.user.userId],
//     );
//     res.status(201).json({ participantId: result.rows[0].participant_id });
//   } catch (error) {
//     next(error);
//   }
// });

// router.post("/:sessionId/leave", authenticateToken, async (req, res, next) => {
//   try {
//     await db.query(
//       "UPDATE participants SET left_at = NOW() WHERE session_id = $1 AND user_id = $2 AND left_at IS NULL",
//       [req.params.sessionId, req.user.userId],
//     );
//     res.json({ message: "Left session successfully" });
//   } catch (error) {
//     next(error);
//   }
// });

// export default router;

import express from "express";
import { v4 as uuidv4 } from "uuid";
import { authenticateToken } from "../utils/auth.js";
import db from "../db.js";
import logger from "../utils/logger.js";

const router = express.Router();

router.post("/", authenticateToken, async (req, res, next) => {
  try {
    const {
      session_title,
      description,
      language,
      is_private,
      is_temporary,
      auto_delete,
    } = req.body;
    const sessionId = uuidv4();
    const result = await db.query(
      "INSERT INTO live_sessions (session_id, host_user_id, session_title, description, language, is_private, is_temporary, auto_delete, started_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW()) RETURNING session_id",
      [
        sessionId,
        req.user.userId,
        session_title,
        description,
        language,
        is_private,
        is_temporary,
        auto_delete,
      ],
    );
    logger.info(`New session created: ${sessionId}`);
    res.status(201).json({ sessionId });
  } catch (error) {
    next(error);
  }
});

router.post("/:sessionId/end", authenticateToken, async (req, res, next) => {
  try {
    const result = await db.query(
      "UPDATE live_sessions SET ended_at = NOW() WHERE session_id = $1 AND host_user_id = $2 RETURNING *",
      [req.params.sessionId, req.user.userId],
    );
    if (result.rows.length > 0) {
      logger.info(`Session ended: ${req.params.sessionId}`);
      res.json({ message: "Session ended successfully" });
    } else {
      res
        .status(404)
        .json({ message: "Session not found or user not authorized" });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/active", async (req, res, next) => {
  try {
    const result = await db.query(
      "SELECT * FROM live_sessions WHERE ended_at IS NULL",
    );
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

router.post("/:sessionId/join", authenticateToken, async (req, res, next) => {
  try {
    const result = await db.query(
      "INSERT INTO participants (session_id, user_id, joined_at) VALUES ($1, $2, NOW()) RETURNING participant_id",
      [req.params.sessionId, req.user.userId],
    );
    logger.info(
      `User ${req.user.userId} joined session ${req.params.sessionId}`,
    );
    res.status(201).json({ participantId: result.rows[0].participant_id });
  } catch (error) {
    next(error);
  }
});

router.post("/:sessionId/leave", authenticateToken, async (req, res, next) => {
  try {
    await db.query(
      "UPDATE participants SET left_at = NOW() WHERE session_id = $1 AND user_id = $2 AND left_at IS NULL",
      [req.params.sessionId, req.user.userId],
    );
    logger.info(`User ${req.user.userId} left session ${req.params.sessionId}`);
    res.json({ message: "Left session successfully" });
  } catch (error) {
    next(error);
  }
});

export default router;
