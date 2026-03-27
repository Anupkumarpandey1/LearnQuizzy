import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import QuizForm from '../components/QuizForm';

function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);

    try {
      const res = await axios.post('/api/quiz/generate', formData);
      navigate(`/quiz/${res.data.quizId}`);
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Failed to generate quiz. Try again!';
      alert(errorMsg);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>🧠 LearnQuizzy</h1>
      <p style={{ textAlign: 'center', marginBottom: '30px', color: '#666' }}>
        Generate AI-powered quizzes instantly and share with friends!
      </p>

      <QuizForm onSubmit={handleSubmit} loading={loading} />
      
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button 
          onClick={() => navigate('/dashboard')}
          style={{ background: 'transparent', color: '#667eea', border: '2px solid #667eea' }}
        >
          Browse Existing Quizzes
        </button>
      </div>
    </div>
  );
}

export default Home;
