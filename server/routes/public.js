import express from 'express';
import { getPublicQuizzes } from '../controllers/publicController.js';

const router = express.Router();

router.get('/public', getPublicQuizzes);

export default router;
