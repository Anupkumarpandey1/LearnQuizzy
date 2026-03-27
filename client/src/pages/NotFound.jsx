import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="container" style={{ textAlign: 'center' }}>
      <h1 style={{ fontSize: '72px', marginBottom: '20px' }}>404</h1>
      <p style={{ fontSize: '24px', color: '#666', marginBottom: '30px' }}>
        Quiz not found
      </p>
      <button onClick={() => navigate('/')}>
        Go Home
      </button>
    </div>
  );
}

export default NotFound;
