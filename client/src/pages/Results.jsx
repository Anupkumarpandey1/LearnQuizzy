import { useLocation, useParams, useNavigate } from 'react-router-dom';

function Results() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { score, total, correctAnswers, userAnswers } = location.state || {};

  if (!location.state) {
    return (
      <div className="container">
        <p>No results found</p>
        <button onClick={() => navigate('/')}>Go Home</button>
      </div>
    );
  }

  const percentage = Math.round((score / total) * 100);
  const emoji = percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '💪';

  return (
    <div className="container">
      <h1>{emoji} Quiz Complete!</h1>
      
      <div style={{ textAlign: 'center', margin: '30px 0' }}>
        <div style={{ fontSize: '64px', fontWeight: 'bold', color: '#667eea' }}>
          {score}/{total}
        </div>
        <p style={{ fontSize: '24px', color: '#666' }}>{percentage}% Correct</p>
      </div>

      <h2 style={{ marginTop: '40px', marginBottom: '20px' }}>Answer Explanations</h2>
      
      {correctAnswers.map((item, idx) => {
        const isCorrect = userAnswers[idx] === item.correctAnswer;
        return (
          <div key={idx} className="question-card">
            <p style={{ marginBottom: '10px', fontSize: '16px' }}>
              <strong>Question {idx + 1}</strong>
            </p>
            <p style={{ marginBottom: '10px' }}>
              Your answer: <strong>{userAnswers[idx] || 'Not answered'}</strong>
              {isCorrect ? ' ✅' : ' ❌'}
            </p>
            {!isCorrect && (
              <p style={{ color: '#28a745', fontWeight: '600', marginBottom: '10px' }}>
                Correct answer: {item.correctAnswer}
              </p>
            )}
            <p style={{ marginTop: '10px', color: '#666', fontStyle: 'italic' }}>
              💡 {item.explanation}
            </p>
          </div>
        );
      })}

      <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
        <button onClick={() => navigate(`/quiz/${quizId}/leaderboard`)} style={{ flex: 1 }}>
          View Leaderboard 🏆
        </button>
        <button onClick={() => navigate('/')} style={{ flex: 1, background: '#6c757d' }}>
          Create New Quiz
        </button>
      </div>
    </div>
  );
}

export default Results;
