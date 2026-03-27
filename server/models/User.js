import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  quizzesCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }],
  quizzesAttempted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attempt' }]
}, { timestamps: true });

export default mongoose.model('User', userSchema);
