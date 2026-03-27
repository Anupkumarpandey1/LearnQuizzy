import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Create & Share
            <span className="gradient-text"> AI-Powered Quizzes</span>
          </h1>
          <p className="hero-subtitle">
            Generate custom quizzes on any topic in seconds. Share with friends, compete on leaderboards, and learn together.
          </p>
          <button className="cta-button" onClick={() => navigate('/create')}>
            Start Creating →
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">🤖</div>
          <h3>AI-Generated</h3>
          <p>Just describe what you want to learn. Our AI creates engaging quizzes with explanations instantly.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🔗</div>
          <h3>Shareable Links</h3>
          <p>Get a unique link for every quiz. Share on WhatsApp, Twitter, or anywhere. No login required to play.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🏆</div>
          <h3>Live Leaderboards</h3>
          <p>Real-time rankings with scores and completion times. See who's the fastest and smartest.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>Instant Results</h3>
          <p>Get detailed explanations for every answer. Learn why you got it right or wrong.</p>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h4>Describe Your Topic</h4>
            <p>Enter any subject you want to learn about</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">2</div>
            <h4>AI Generates Quiz</h4>
            <p>Get custom questions in seconds</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">3</div>
            <h4>Share & Compete</h4>
            <p>Challenge friends and climb the leaderboard</p>
          </div>
        </div>
      </section>

      {/* What's New */}
      <section className="whats-new">
        <div className="new-badge">What's New</div>
        <h2>Latest Features</h2>
        <div className="updates">
          <div className="update-item">
            <span className="update-icon">🎯</span>
            <div>
              <strong>Difficulty Levels</strong>
              <p>Choose between Easy, Medium, and Hard</p>
            </div>
          </div>
          <div className="update-item">
            <span className="update-icon">📊</span>
            <div>
              <strong>Public Quiz Feed</strong>
              <p>Browse and attempt quizzes from the community</p>
            </div>
          </div>
          <div className="update-item">
            <span className="update-icon">⏱️</span>
            <div>
              <strong>Timer Tracking</strong>
              <p>Compete on speed with live timing</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Create your first AI-powered quiz in under 30 seconds</p>
        <button className="cta-button" onClick={() => navigate('/create')}>
          Create Your Quiz →
        </button>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>Built by Anup Kumar Pandey • Open Source</p>
      </footer>
    </div>
  );
}

export default Landing;
