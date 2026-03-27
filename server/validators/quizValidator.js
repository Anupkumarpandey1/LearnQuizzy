export const validateQuizGeneration = (req, res, next) => {
  const { prompt, toughness, numQuestions, numOptions } = req.body;

  if (!prompt || prompt.trim().length < 3) {
    return res.status(400).json({ error: 'Prompt must be at least 3 characters' });
  }

  if (!['easy', 'medium', 'hard'].includes(toughness)) {
    return res.status(400).json({ error: 'Invalid difficulty level' });
  }

  if (numQuestions < 3 || numQuestions > 20) {
    return res.status(400).json({ error: 'Questions must be between 3 and 20' });
  }

  if (![2, 3, 4].includes(numOptions)) {
    return res.status(400).json({ error: 'Options must be 2, 3, or 4' });
  }

  next();
};

export const validateAttempt = (req, res, next) => {
  const { playerName, answers, timeTaken } = req.body;

  if (!playerName || playerName.trim().length < 1) {
    return res.status(400).json({ error: 'Player name is required' });
  }

  if (!Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({ error: 'Answers are required' });
  }

  if (typeof timeTaken !== 'number' || timeTaken < 0) {
    return res.status(400).json({ error: 'Invalid time taken' });
  }

  next();
};
