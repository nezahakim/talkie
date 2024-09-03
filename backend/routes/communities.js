import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../utils/auth.js';

const router = express.Router();

router.post('/', authenticateToken, async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const result = await db.query(
      'INSERT INTO community (name, description, created_by, created_at) VALUES ($1, $2, $3, NOW()) RETURNING community_id',
      [name, description, req.user.userId]
    );
    res.status(201).json({ communityId: result.rows[0].community_id });
  } catch (error) {
    next(error);
  }
});

router.get('/:communityId', async (req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM community WHERE community_id = $1', [req.params.communityId]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Community not found' });
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:communityId', authenticateToken, async (req, res, next) => {
  try {
    const result = await db.query('DELETE FROM community WHERE community_id = $1 AND created_by = $2 RETURNING *', [req.params.communityId, req.user.userId]);
    if (result.rows.length > 0) {
      res.json({ message: 'Community deleted successfully' });
    } else {
      res.status(404).json({ message: 'Community not found or user not authorized' });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
