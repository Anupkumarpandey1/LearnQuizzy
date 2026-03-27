import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';

function Dashboard() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/public')
      .then(res => {
        setQuizzes(res.data);
        setLoading(false);
      })
      .catch(() => {
        setQuizzes([]);
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingSpinner message="Loading quizzes..." />;

  return (
    <div className="container">
      <h1>📚 Browse Quizzes</h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
        Discover and attempt quizzes created by the community
      </p>

      <div>
        {quizzes.map(quiz => (
          <div 
            key={quiz.quizId} 
            className="question-card" 
            style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
            onClick={() => navigate(`/quiz/${quiz.quizId}`)}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <h3>{quiz.title}</h3>
            <p style={{ color: '#666', marginTop: '8px', fontSize: '14px' }}>
              📝 {quiz.questionCount} questions • 🎯 {quiz.toughness}
            </p>
            <p style={{ fontSize: '13px', color: '#999', marginTop: '8px' }}>
              Created {new Date(quiz.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {quizzes.length === 0 && (
        <p style={{ textAlign: 'center', color: '#999', marginTop: '40px' }}>
          No quizzes yet. Create the first one!
        </p>
      )}
    </div>
  );
}

export default Dashboard;
