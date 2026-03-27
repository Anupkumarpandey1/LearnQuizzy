import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.js';
import quizRoutes from './routes/quiz.js';
import publicRoutes from './routes/public.js';
import authRoutes from './routes/auth.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);

const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL
].filter(Boolean);

const io = new Server(httpServer, {
  cors: { 
    origin: allowedOrigins,
    credentials: true 
  }
});

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

// Make io accessible in routes
app.set('io', io);

connectDB();

app.use('/api/quiz', quizRoutes);
app.use('/api', publicRoutes);
app.use('/api/auth', authRoutes);

io.on('connection', (socket) => {
  socket.on('join-quiz', (quizId) => {
    socket.join(quizId);
  });

  socket.on('new-attempt', (quizId) => {
    io.to(quizId).emit('leaderboard-update');
  });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
