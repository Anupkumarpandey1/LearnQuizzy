import { useState } from 'react';

function ShareBox({ quizId }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}/quiz/${quizId}`;

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWhatsApp = () => {
    const text = encodeURIComponent(`Check out this quiz! ${shareUrl}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const shareTwitter = () => {
    const text = encodeURIComponent(`I just created a quiz on LearnQuizzy! Can you beat my score?`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  return (
    <div className="share-box">
      <input type="text" value={shareUrl} readOnly />
      <button onClick={copyLink}>
        {copied ? '✓ Copied!' : 'Copy Link'}
      </button>
      <button onClick={shareWhatsApp} style={{ width: 'auto', padding: '12px 20px', background: '#25D366' }}>
        WhatsApp
      </button>
      <button onClick={shareTwitter} style={{ width: 'auto', padding: '12px 20px', background: '#1DA1F2' }}>
        Twitter
      </button>
    </div>
  );
}

export default ShareBox;
