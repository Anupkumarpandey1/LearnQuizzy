import Quiz from '../models/Quiz.js';

export const getPublicQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ isPublic: true })
      .sort({ createdAt: -1 })
      .limit(50)
      .select('quizId title prompt toughness questions createdAt');
    
    const formatted = quizzes.map(q => ({
      quizId: q.quizId,
      title: q.title,
      prompt: q.prompt,
      toughness: q.toughness,
      questionCount: q.questions?.length || 0,
      createdAt: q.createdAt
    }));

    res.json(formatted);
  } catch (error) {
    console.error('Public quizzes error:', error);
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
};
