import { useState } from 'react';

function QuizForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    prompt: '',
    toughness: 'medium',
    numQuestions: 5,
    numOptions: 4
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>What do you want to learn about?</label>
        <textarea
          rows="3"
          placeholder="e.g., JavaScript Promises, World War 2, Quantum Physics..."
          value={formData.prompt}
          onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label>Difficulty Level</label>
        <select
          value={formData.toughness}
          onChange={(e) => setFormData({ ...formData, toughness: e.target.value })}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div className="form-group">
        <label>Number of Questions</label>
        <input
          type="number"
          min="3"
          max="20"
          value={formData.numQuestions}
          onChange={(e) => setFormData({ ...formData, numQuestions: parseInt(e.target.value) })}
          required
        />
      </div>

      <div className="form-group">
        <label>Options per Question</label>
        <select
          value={formData.numOptions}
          onChange={(e) => setFormData({ ...formData, numOptions: parseInt(e.target.value) })}
        >
          <option value="2">2 Options</option>
          <option value="3">3 Options</option>
          <option value="4">4 Options</option>
        </select>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? '🤖 Generating Quiz...' : '✨ Generate Quiz'}
      </button>
    </form>
  );
}

export default QuizForm;
