import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useSocket } from '../hooks/useSocket';
import LeaderboardTable from '../components/LeaderboardTable';
import ShareBox from '../components/ShareBox';
import LoadingSpinner from '../components/LoadingSpinner';

function Leaderboard() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState([]);
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLeaderboard = useCallback(() => {
    api.get(`/api/quiz/${quizId}/leaderboard`)
      .then(res => setLeaderboard(res.data))
      .catch(() => setLeaderboard([]));
  }, [quizId]);

  useEffect(() => {
    Promise.all([
      api.get(`/api/quiz/${quizId}`),
      api.get(`/api/quiz/${quizId}/leaderboard`)
    ])
      .then(([quizRes, leaderboardRes]) => {
        setQuiz(quizRes.data);
        setLeaderboard(leaderboardRes.data);
        setLoading(false);
      })
      .catch(() => {
        alert('Quiz not found');
        navigate('/');
      });
  }, [quizId, navigate]);

  useSocket(quizId, fetchLeaderboard);

  if (loading) return <LoadingSpinner message="Loading leaderboard..." />;

  return (
    <div className="container">
      <h1>🏆 Leaderboard</h1>
      {quiz && (
        <h2 style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>
          {quiz.title}
        </h2>
      )}

      <ShareBox quizId={quizId} />

      <LeaderboardTable entries={leaderboard} />

      <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
        <button onClick={() => navigate(`/quiz/${quizId}`)} style={{ flex: 1 }}>
          Attempt Quiz
        </button>
        <button onClick={() => navigate('/dashboard')} style={{ flex: 1, background: '#6c757d' }}>
          Browse More
        </button>
      </div>
    </div>
  );
}

export default Leaderboard;
