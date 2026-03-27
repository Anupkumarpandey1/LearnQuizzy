import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav style={{
      background: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(10px)',
      padding: '16px 20px',
      marginBottom: '20px',
      borderRadius: '12px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      maxWidth: '1200px',
      margin: '20px auto',
      flexWrap: 'wrap',
      gap: '12px'
    }}>
      <h2 
        onClick={() => navigate('/')} 
        style={{ cursor: 'pointer', color: '#667eea', margin: 0, fontSize: 'clamp(18px, 4vw, 24px)' }}
      >
        🧠 LearnQuizzy
      </h2>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <button 
          onClick={() => navigate('/create')}
          style={{ width: 'auto', padding: '8px 16px', fontSize: '14px' }}
        >
          Create Quiz
        </button>
        <button 
          onClick={() => navigate('/dashboard')}
          style={{ width: 'auto', padding: '8px 16px', fontSize: '14px' }}
        >
          Browse Quizzes
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
