import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Timer from '../components/Timer';
import QuestionCard from '../components/QuestionCard';
import LoadingSpinner from '../components/LoadingSpinner';

function QuizPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timer, setTimer] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const [started, setStarted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/api/quiz/${quizId}`)
      .then(res => {
        setQuiz(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert('Quiz not found');
        navigate('/');
      });
  }, [quizId, navigate]);

  useEffect(() => {
    if (!started) return;
    const interval = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, [started]);

  const handleStart = () => {
    if (!playerName.trim()) return alert('Enter your name!');
    setStarted(true);
  };

  const handleAnswer = (option) => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = option;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQ < quiz.questions.length - 1) {
      setCurrentQ(currentQ + 1);
    }
  };

  const handleSubmit = async () => {
    if (answers.length !== quiz.questions.length) {
      alert('Please answer all questions!');
      return;
    }
    
    setSubmitting(true);
    try {
      const res = await api.post(`/api/quiz/${quizId}/attempt`, {
        playerName,
        answers,
        timeTaken: timer
      });
      
      navigate(`/quiz/${quizId}/results`, { 
        state: { 
          score: res.data.score, 
          total: res.data.totalQuestions,
          correctAnswers: res.data.correctAnswers,
          userAnswers: answers
        } 
      });
    } catch (error) {
      alert('Failed to submit. Try again!');
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading quiz..." />;
  if (!quiz) return <LoadingSpinner message="Quiz not found..." />;

  if (!started) {
    return (
      <div className="container">
        <h1>{quiz.title}</h1>
        <p style={{ marginBottom: '20px', color: '#666' }}>
          {quiz.questions.length} questions • {quiz.toughness} difficulty
        </p>
        <div className="form-group">
          <label>Your Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
        </div>
        <button onClick={handleStart}>Start Quiz</button>
      </div>
    );
  }

  const question = quiz.questions[currentQ];
  const progress = ((currentQ + 1) / quiz.questions.length) * 100;

  return (
    <>
      <Timer seconds={timer} />
      
      <div className="container">
        <h1>{quiz.title}</h1>
        
        <div style={{ 
          background: '#e0e0e0', 
          height: '8px', 
          borderRadius: '4px', 
          marginBottom: '20px',
          overflow: 'hidden'
        }}>
          <div style={{ 
            background: '#667eea', 
            height: '100%', 
            width: `${progress}%`,
            transition: 'width 0.3s'
          }} />
        </div>

        <p style={{ marginBottom: '20px', color: '#666' }}>
          Question {currentQ + 1} of {quiz.questions.length}
        </p>

        <QuestionCard
          question={question.question}
          options={question.options}
          selectedAnswer={answers[currentQ]}
          onSelect={handleAnswer}
        />

        <div style={{ display: 'flex', gap: '10px' }}>
          {currentQ > 0 && (
            <button 
              onClick={() => setCurrentQ(currentQ - 1)}
              style={{ width: 'auto', padding: '12px 24px' }}
            >
              ← Previous
            </button>
          )}
          
          {currentQ < quiz.questions.length - 1 ? (
            <button onClick={handleNext} disabled={!answers[currentQ]} style={{ flex: 1 }}>
              Next Question →
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={submitting || !answers[currentQ]} style={{ flex: 1 }}>
              {submitting ? 'Submitting...' : 'Submit Quiz'}
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default QuizPage;
