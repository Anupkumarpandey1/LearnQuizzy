import mongoose from 'mongoose';

const attemptSchema = new mongoose.Schema({
  quizId: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  playerName: { type: String, required: true },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  timeTaken: { type: Number, required: true },
  answers: [{
    questionIndex: Number,
    selectedAnswer: String,
    isCorrect: Boolean
  }]
}, { timestamps: true });

attemptSchema.index({ quizId: 1, score: -1, timeTaken: 1 });

export default mongoose.model('Attempt', attemptSchema);
