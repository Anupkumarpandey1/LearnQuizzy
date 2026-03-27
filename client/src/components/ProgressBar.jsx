function ProgressBar({ current, total }) {
  const progress = (current / total) * 100;

  return (
    <div style={{ 
      background: '#e0e0e0', 
      height: '8px', 
      borderRadius: '4px', 
      marginBottom: '20px',
      overflow: 'hidden'
    }}>
      <div style={{ 
        background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)', 
        height: '100%', 
        width: `${progress}%`,
        transition: 'width 0.3s ease'
      }} />
    </div>
  );
}

export default ProgressBar;
