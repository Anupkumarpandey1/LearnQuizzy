import { nanoid } from 'nanoid';
import Quiz from '../models/Quiz.js';
import Attempt from '../models/Attempt.js';
import { generateQuizWithAI } from '../utils/gemini.js';

export const generateQuiz = async (req, res) => {
  try {
    const { prompt, toughness, numQuestions, numOptions } = req.body;

    console.log('📝 Generating quiz with:', { prompt, toughness, numQuestions, numOptions });
    console.log('🔑 API Key present:', !!process.env.GEMINI_API_KEY);

    const quizData = await generateQuizWithAI(prompt, toughness, numQuestions, numOptions);

    console.log('✅ Quiz data generated successfully');

    const quiz = new Quiz({
      quizId: nanoid(8),
      title: quizData.title,
      prompt,
      toughness,
      questions: quizData.questions,
      createdBy: req.body.userId || null,
      isPublic: true
    });

    await quiz.save();

    console.log('✅ Quiz saved to database:', quiz.quizId);

    res.json({ 
      success: true, 
      quizId: quiz.quizId,
      shareUrl: `${req.protocol}://${req.get('host')}/quiz/${quiz.quizId}`
    });
  } catch (error) {
    console.error('❌ Quiz generation error:', error.message);
    console.error('❌ Full error:', error);
    res.status(500).json({ 
      error: 'Failed to generate quiz',
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

export const getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ quizId: req.params.quizId })
      .select('-questions.correctAnswer');
    
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
};

export const submitAttempt = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { playerName, answers, timeTaken } = req.body;

    const quiz = await Quiz.findOne({ quizId });
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

    const processedAnswers = answers.map((ans, idx) => ({
      questionIndex: idx,
      selectedAnswer: ans,
      isCorrect: ans === quiz.questions[idx].correctAnswer
    }));

    const score = processedAnswers.filter(a => a.isCorrect).length;

    const attempt = new Attempt({
      quizId,
      userId: req.body.userId || null,
      playerName,
      score,
      totalQuestions: quiz.questions.length,
      timeTaken,
      answers: processedAnswers
    });

    await attempt.save();

    // Emit socket event for real-time leaderboard update
    const io = req.app.get('io');
    if (io) {
      io.to(quizId).emit('leaderboard-update');
    }

    const correctAnswers = quiz.questions.map(q => ({
      correctAnswer: q.correctAnswer,
      explanation: q.explanation
    }));

    res.json({ 
      success: true, 
      score, 
      totalQuestions: quiz.questions.length,
      correctAnswers 
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit attempt' });
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    const { quizId } = req.params;
    
    const leaderboard = await Attempt.find({ quizId })
      .sort({ score: -1, timeTaken: 1 })
      .limit(50)
      .select('playerName score totalQuestions timeTaken createdAt');

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
};
