import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const quizAPI = {
  generate: (data) => axios.post(`${API_URL}/api/quiz/generate`, data),
  getQuiz: (quizId) => axios.get(`${API_URL}/api/quiz/${quizId}`),
  submitAttempt: (quizId, data) => axios.post(`${API_URL}/api/quiz/${quizId}/attempt`, data),
  getLeaderboard: (quizId) => axios.get(`${API_URL}/api/quiz/${quizId}/leaderboard`),
  getPublicQuizzes: () => axios.get(`${API_URL}/api/public`)
};

export default quizAPI;
