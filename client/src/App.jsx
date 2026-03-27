import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Home from './pages/Home';
import QuizPage from './pages/QuizPage';
import Results from './pages/Results';
import Leaderboard from './pages/Leaderboard';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/create" element={<><Navbar /><Home /></>} />
        <Route path="/dashboard" element={<><Navbar /><Dashboard /></>} />
        <Route path="/quiz/:quizId" element={<><Navbar /><QuizPage /></>} />
        <Route path="/quiz/:quizId/results" element={<><Navbar /><Results /></>} />
        <Route path="/quiz/:quizId/leaderboard" element={<><Navbar /><Leaderboard /></>} />
        <Route path="*" element={<><Navbar /><NotFound /></>} />
      </Routes>
    </div>
  );
}

export default App;
