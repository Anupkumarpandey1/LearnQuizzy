function QuestionCard({ question, options, selectedAnswer, onSelect }) {
  return (
    <div className="question-card">
      <h3 style={{ marginBottom: '20px' }}>{question}</h3>
      
      {options.map((option, idx) => (
        <div
          key={idx}
          className={`option ${selectedAnswer === option ? 'selected' : ''}`}
          onClick={() => onSelect(option)}
        >
          {option}
        </div>
      ))}
    </div>
  );
}

export default QuestionCard;
