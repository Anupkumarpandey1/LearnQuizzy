function Timer({ seconds }) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <div className="timer">
      ⏱️ {minutes}:{secs.toString().padStart(2, '0')}
    </div>
  );
}

export default Timer;
