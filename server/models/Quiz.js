import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  quizId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  prompt: { type: String, required: true },
  toughness: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  questions: [{
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: String, required: true },
    explanation: { type: String, required: true }
  }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isPublic: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Quiz', quizSchema);
