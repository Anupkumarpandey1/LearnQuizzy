import express from 'express';
import { generateQuiz, getQuiz, submitAttempt, getLeaderboard } from '../controllers/quizController.js';
import { validateQuizGeneration, validateAttempt } from '../validators/quizValidator.js';

const router = express.Router();

router.post('/generate', validateQuizGeneration, generateQuiz);
router.get('/:quizId', getQuiz);
router.post('/:quizId/attempt', validateAttempt, submitAttempt);
router.get('/:quizId/leaderboard', getLeaderboard);

export default router;
