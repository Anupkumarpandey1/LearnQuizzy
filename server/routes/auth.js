import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Placeholder for future auth implementation
router.post('/register', async (req, res) => {
  res.status(501).json({ message: 'Auth coming soon' });
});

router.post('/login', async (req, res) => {
  res.status(501).json({ message: 'Auth coming soon' });
});

export default router;
