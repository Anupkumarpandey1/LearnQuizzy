import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import '../landing.css';

function Landing() {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({ quizzes: 0, users: 0, questions: 0 });

  // Scroll-reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Animated counter
  useEffect(() => {
    const targets = { quizzes: 500, users: 1200, questions: 5000 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounts({
        quizzes: Math.round(targets.quizzes * eased),
        users: Math.round(targets.users * eased),
        questions: Math.round(targets.questions * eased),
      });
      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Floating particles
  useEffect(() => {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.hue = Math.random() > 0.5 ? 240 : 270;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 70%, 70%, ${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < 80; i++) particles.push(new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => { p.update(); p.draw(); });
      
      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `hsla(250, 70%, 70%, ${0.1 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="landing">
      <canvas id="particle-canvas" className="particle-canvas"></canvas>

      {/* Navbar */}
      <nav className="landing-nav">
        <div className="nav-logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">LearnQuizzy</span>
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#testimonials">Reviews</a>
          <button className="nav-cta" onClick={() => navigate('/create')}>Get Started</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="hero-content">
          <div className="hero-badge reveal">
            <span className="pulse-dot"></span>
            Powered by Google Gemini AI
          </div>
          <h1 className="hero-title reveal">
            Transform Any Topic Into
            <span className="gradient-text"> Interactive Quizzes</span>
            <span className="hero-sparkle">✨</span>
          </h1>
          <p className="hero-subtitle reveal">
            Create stunning AI-generated quizzes in seconds. Share with friends, 
            compete on real-time leaderboards, and learn smarter — not harder.
          </p>
          <div className="hero-buttons reveal">
            <button className="cta-button primary-cta" onClick={() => navigate('/create')}>
              <span>Start Creating Free</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <button className="cta-button secondary-cta" onClick={() => navigate('/dashboard')}>
              <span>Browse Quizzes</span>
            </button>
          </div>
          <div className="hero-stats reveal">
            <div className="stat-item">
              <span className="stat-number">{counts.quizzes.toLocaleString()}+</span>
              <span className="stat-label">Quizzes Created</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">{counts.users.toLocaleString()}+</span>
              <span className="stat-label">Active Users</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">{counts.questions.toLocaleString()}+</span>
              <span className="stat-label">Questions Generated</span>
            </div>
          </div>
        </div>

        {/* Floating orbs */}
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </section>

      {/* Trusted By / Social Proof Bar */}
      <section className="social-proof reveal">
        <p className="proof-label">Trusted by learners at</p>
        <div className="proof-logos">
          <span className="proof-logo">🎓 Universities</span>
          <span className="proof-logo">🏢 Companies</span>
          <span className="proof-logo">📚 Study Groups</span>
          <span className="proof-logo">👨‍🏫 Educators</span>
          <span className="proof-logo">💻 Developers</span>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-section" id="features">
        <div className="section-header reveal">
          <span className="section-badge">Features</span>
          <h2 className="section-title">Everything You Need to <span className="gradient-text">Learn Better</span></h2>
          <p className="section-subtitle">Powerful tools that make learning engaging, social, and effective</p>
        </div>

        <div className="features-grid">
          <div className="feature-card reveal" style={{'--delay': '0s'}}>
            <div className="feature-glow"></div>
            <div className="feature-icon-wrap">
              <span className="feature-icon">🤖</span>
            </div>
            <h3>AI-Powered Generation</h3>
            <p>Describe any topic and watch as Google Gemini creates perfectly crafted questions with detailed explanations.</p>
            <div className="feature-tag">Gemini AI</div>
          </div>

          <div className="feature-card reveal" style={{'--delay': '0.1s'}}>
            <div className="feature-glow"></div>
            <div className="feature-icon-wrap">
              <span className="feature-icon">🔗</span>
            </div>
            <h3>One-Click Sharing</h3>
            <p>Get a unique link for every quiz. Share on WhatsApp, Twitter, or anywhere. No login required to play.</p>
            <div className="feature-tag">Shareable</div>
          </div>

          <div className="feature-card reveal" style={{'--delay': '0.2s'}}>
            <div className="feature-glow"></div>
            <div className="feature-icon-wrap">
              <span className="feature-icon">🏆</span>
            </div>
            <h3>Live Leaderboards</h3>
            <p>Real-time competitive rankings with scores and completion times. See who's the fastest and smartest.</p>
            <div className="feature-tag">Real-time</div>
          </div>

          <div className="feature-card reveal" style={{'--delay': '0.3s'}}>
            <div className="feature-glow"></div>
            <div className="feature-icon-wrap">
              <span className="feature-icon">⚡</span>
            </div>
            <h3>Instant Results</h3>
            <p>Get detailed explanations for every answer right after submission. Learn from your mistakes instantly.</p>
            <div className="feature-tag">Fast</div>
          </div>

          <div className="feature-card reveal" style={{'--delay': '0.4s'}}>
            <div className="feature-glow"></div>
            <div className="feature-icon-wrap">
              <span className="feature-icon">🎯</span>
            </div>
            <h3>Difficulty Levels</h3>
            <p>Choose between Easy, Medium, and Hard. Customize the challenge to match your learning goals.</p>
            <div className="feature-tag">Customizable</div>
          </div>

          <div className="feature-card reveal" style={{'--delay': '0.5s'}}>
            <div className="feature-glow"></div>
            <div className="feature-icon-wrap">
              <span className="feature-icon">📊</span>
            </div>
            <h3>Public Quiz Feed</h3>
            <p>Browse and attempt quizzes created by the community. Discover new topics and challenge yourself.</p>
            <div className="feature-tag">Community</div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works-section" id="how-it-works">
        <div className="section-header reveal">
          <span className="section-badge">How It Works</span>
          <h2 className="section-title">Create a Quiz in <span className="gradient-text">3 Simple Steps</span></h2>
          <p className="section-subtitle">From idea to live quiz in under 30 seconds</p>
        </div>

        <div className="steps-container">
          <div className="step-card reveal" style={{'--delay': '0s'}}>
            <div className="step-number-lg">01</div>
            <div className="step-content">
              <div className="step-icon-circle">📝</div>
              <h3>Describe Your Topic</h3>
              <p>Type any subject — from quantum physics to pop culture. Our AI understands complex topics in natural language.</p>
            </div>
            <div className="step-connector"></div>
          </div>

          <div className="step-card reveal" style={{'--delay': '0.15s'}}>
            <div className="step-number-lg">02</div>
            <div className="step-content">
              <div className="step-icon-circle">🧠</div>
              <h3>AI Generates Your Quiz</h3>
              <p>Google Gemini creates custom questions with multiple options, correct answers, and detailed explanations.</p>
            </div>
            <div className="step-connector"></div>
          </div>

          <div className="step-card reveal" style={{'--delay': '0.3s'}}>
            <div className="step-number-lg">03</div>
            <div className="step-content">
              <div className="step-icon-circle">🚀</div>
              <h3>Share & Compete</h3>
              <p>Get a shareable link, challenge friends, track scores on live leaderboards, and learn together.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section" id="testimonials">
        <div className="section-header reveal">
          <span className="section-badge">Testimonials</span>
          <h2 className="section-title">Loved by <span className="gradient-text">Learners Everywhere</span></h2>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card reveal" style={{'--delay': '0s'}}>
            <div className="testimonial-stars">★★★★★</div>
            <p>"This is exactly what I needed for my study group. We create quizzes for each other and compete on the leaderboard. So much fun!"</p>
            <div className="testimonial-author">
              <div className="author-avatar">SK</div>
              <div>
                <strong>Sneha K.</strong>
                <span>Computer Science Student</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card reveal" style={{'--delay': '0.1s'}}>
            <div className="testimonial-stars">★★★★★</div>
            <p>"I use LearnQuizzy to test my students before exams. The AI generates quality questions and saves me hours of work."</p>
            <div className="testimonial-author">
              <div className="author-avatar">RP</div>
              <div>
                <strong>Raj P.</strong>
                <span>University Professor</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card reveal" style={{'--delay': '0.2s'}}>
            <div className="testimonial-stars">★★★★★</div>
            <p>"The shared quiz feature is brilliant. I sent a link to my WhatsApp group and everyone loved competing for the top spot!"</p>
            <div className="testimonial-author">
              <div className="author-avatar">AM</div>
              <div>
                <strong>Aisha M.</strong>
                <span>EdTech Enthusiast</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="use-cases-section">
        <div className="section-header reveal">
          <span className="section-badge">Use Cases</span>
          <h2 className="section-title">Built for <span className="gradient-text">Every Learner</span></h2>
        </div>

        <div className="use-cases-grid">
          <div className="use-case-card reveal" style={{'--delay': '0s'}}>
            <div className="use-case-emoji">🎓</div>
            <h3>Students</h3>
            <p>Prepare for exams by testing yourself on any topic. Get instant explanations for wrong answers.</p>
          </div>
          <div className="use-case-card reveal" style={{'--delay': '0.1s'}}>
            <div className="use-case-emoji">👨‍🏫</div>
            <h3>Teachers</h3>
            <p>Create assessments in seconds. Share links with students and track performance on leaderboards.</p>
          </div>
          <div className="use-case-card reveal" style={{'--delay': '0.2s'}}>
            <div className="use-case-emoji">👥</div>
            <h3>Study Groups</h3>
            <p>Challenge your group with custom quizzes. Compete, learn, and have fun together.</p>
          </div>
          <div className="use-case-card reveal" style={{'--delay': '0.3s'}}>
            <div className="use-case-emoji">🏢</div>
            <h3>Corporate Training</h3>
            <p>Quickly create compliance and training quizzes. Share with your team via a simple link.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="final-cta-section reveal">
        <div className="cta-glow"></div>
        <h2>Ready to Create Your First Quiz?</h2>
        <p>Join thousands of learners already using LearnQuizzy. It's free, fast, and fun.</p>
        <button className="cta-button primary-cta cta-large" onClick={() => navigate('/create')}>
          <span>Create Your Quiz Now</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
        <p className="cta-note">No sign-up required • 100% free • Takes 30 seconds</p>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="logo-icon">⚡</span>
            <span className="logo-text">LearnQuizzy</span>
            <p>AI-powered quiz generation for everyone.</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#how-it-works">How It Works</a>
              <a href="#testimonials">Reviews</a>
            </div>
            <div className="footer-col">
              <h4>Resources</h4>
              <a onClick={() => navigate('/create')}>Create Quiz</a>
              <a onClick={() => navigate('/dashboard')}>Public Quizzes</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Built with ❤️ by Anup Kumar Pandey • © 2026 LearnQuizzy</p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
