import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

console.log('🔍 Validating LearnQuizzy Project...\n');

const criticalFiles = [
  // Backend
  { path: 'server/server.js', type: 'Backend Entry' },
  { path: 'server/models/Quiz.js', type: 'Quiz Model' },
  { path: 'server/models/Attempt.js', type: 'Attempt Model' },
  { path: 'server/controllers/quizController.js', type: 'Quiz Controller' },
  { path: 'server/routes/quiz.js', type: 'Quiz Routes' },
  { path: 'server/utils/gemini.js', type: 'AI Integration' },
  { path: 'server/.env', type: 'Server Config' },
  
  // Frontend
  { path: 'client/src/main.jsx', type: 'Frontend Entry' },
  { path: 'client/src/App.jsx', type: 'App Router' },
  { path: 'client/src/pages/Home.jsx', type: 'Home Page' },
  { path: 'client/src/pages/QuizPage.jsx', type: 'Quiz Page' },
  { path: 'client/src/pages/Leaderboard.jsx', type: 'Leaderboard' },
  { path: 'client/src/hooks/useSocket.js', type: 'Socket Hook' },
  { path: 'client/.env', type: 'Client Config' }
];

let passed = 0;
let failed = 0;

criticalFiles.forEach(file => {
  const exists = existsSync(join(process.cwd(), file.path));
  if (exists) {
    console.log(`✅ ${file.type.padEnd(20)} ${file.path}`);
    passed++;
  } else {
    console.log(`❌ ${file.type.padEnd(20)} ${file.path}`);
    failed++;
  }
});

console.log(`\n${'='.repeat(50)}`);
console.log(`Passed: ${passed}/${criticalFiles.length}`);
console.log(`Failed: ${failed}/${criticalFiles.length}`);

if (failed === 0) {
  console.log('\n✅ All critical files present!');
  console.log('🚀 Ready to run: npm run dev\n');
} else {
  console.log('\n❌ Some files are missing!');
  console.log('Run: npm run install-all\n');
}

// Check for Gemini API key
try {
  const envContent = readFileSync('server/.env', 'utf-8');
  if (envContent.includes('AIzaSy')) {
    console.log('✅ Gemini API key configured');
  } else {
    console.log('⚠️  Check Gemini API key in server/.env');
  }
} catch (e) {
  console.log('⚠️  Could not verify API key');
}
