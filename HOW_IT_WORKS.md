# 🧠 How LearnQuizzy Works

Simple explanation of how everything works together.

## 🌐 Live URLs

- **Frontend**: https://learn-quizzy.vercel.app/
- **Backend**: https://learnquizzy.onrender.com/
- **Database**: MongoDB Atlas (Cloud)

---

## 📱 User Journey

### 1. Landing Page (/)
User visits → Sees features → Clicks "Start Creating"

### 2. Create Quiz (/create)
User enters:
- Topic (e.g., "JavaScript Promises")
- Difficulty (Easy/Medium/Hard)
- Number of questions (3-20)
- Options per question (2/3/4)

Clicks "Generate Quiz" →

### 3. AI Generates Quiz
**Frontend** sends request to **Backend**:
```
POST /api/quiz/generate
{
  "prompt": "JavaScript Promises",
  "toughness": "medium",
  "numQuestions": 5,
  "numOptions": 4
}
```

**Backend** does:
1. Validates input
2. Calls Gemini AI API
3. Gets quiz JSON from AI
4. Saves to MongoDB
5. Returns unique quiz ID

**Response**:
```json
{
  "success": true,
  "quizId": "abc123",
  "shareUrl": "https://learn-quizzy.vercel.app/quiz/abc123"
}
```

### 4. Quiz Page (/quiz/abc123)
User gets redirected to quiz page:
- Enters their name
- Clicks "Start Quiz"
- Timer starts ⏱️
- Answers questions one by one
- Clicks "Submit Quiz"

**Frontend** sends answers to **Backend**:
```
POST /api/quiz/abc123/attempt
{
  "playerName": "John",
  "answers": ["A", "B", "C", "A", "D"],
  "timeTaken": 120
}
```

**Backend** does:
1. Checks answers against correct ones
2. Calculates score
3. Saves attempt to database
4. Sends real-time update via Socket.io
5. Returns results with explanations

### 5. Results Page (/quiz/abc123/results)
Shows:
- Score (e.g., 4/5)
- Percentage (80%)
- Each question with:
  - User's answer ✅/❌
  - Correct answer
  - AI explanation

### 6. Leaderboard (/quiz/abc123/leaderboard)
Shows all attempts sorted by:
1. Score (highest first)
2. Time (fastest first)

**Real-time updates** via Socket.io when someone new attempts the quiz!

### 7. Share Link
User copies link → Sends to friends → Friends attempt same quiz → Leaderboard updates live!

---

## 🔧 Technical Flow

### Frontend (React + Vercel)
```
User Action → React Component → API Call → Backend
```

### Backend (Node.js + Render)
```
API Request → Validation → Controller → Service → Database/AI → Response
```

### Database (MongoDB Atlas)
```
Quiz Collection: Stores questions, answers, explanations
Attempt Collection: Stores user attempts, scores, times
```

### Real-Time (Socket.io)
```
User submits quiz → Backend emits event → All connected users get update → Leaderboard refreshes
```

---

## 🗂️ Data Flow Example

**Creating a Quiz:**
```
User Input → Frontend → Backend → Gemini AI
                                      ↓
                                  Quiz JSON
                                      ↓
                                  MongoDB
                                      ↓
                              Unique Quiz ID
                                      ↓
                              Shareable Link
```

**Attempting a Quiz:**
```
Quiz Link → Frontend fetches quiz (without answers) → User attempts
                                                           ↓
                                                    Submit answers
                                                           ↓
                                              Backend checks answers
                                                           ↓
                                                   Save to database
                                                           ↓
                                              Socket.io broadcasts
                                                           ↓
                                            Leaderboard updates live
```

---

## 🎯 Key Features Explained

### 1. AI Quiz Generation
- Uses Google Gemini 2.5 Flash model
- Sends structured prompt
- Gets JSON response with questions, options, answers, explanations
- No manual quiz creation needed!

### 2. Shareable Links
- Each quiz gets unique 8-character ID (e.g., `abc123`)
- Anyone with link can attempt
- No login required for guests
- Perfect for viral sharing

### 3. Real-Time Leaderboard
- Socket.io connection between frontend and backend
- When someone submits quiz, event is emitted
- All users viewing that leaderboard get instant update
- No page refresh needed!

### 4. Guest Attempts
- No authentication required
- Just enter name and play
- Scores still tracked on leaderboard
- Frictionless experience

---

## 🏗️ Architecture

```
┌─────────────────┐
│   User Browser  │
│   (React App)   │
└────────┬────────┘
         │ HTTPS
         ↓
┌─────────────────┐
│     Vercel      │
│   (Frontend)    │
└────────┬────────┘
         │ API Calls
         ↓
┌─────────────────┐
│     Render      │
│   (Backend)     │
└────┬────────┬───┘
     │        │
     │        └─────→ Socket.io (Real-time)
     ↓
┌─────────────────┐
│  MongoDB Atlas  │
│   (Database)    │
└─────────────────┘
     ↑
     │
┌─────────────────┐
│   Gemini AI     │
│  (Quiz Gen)     │
└─────────────────┘
```

---

## 🔐 Environment Variables

### Frontend (Vercel)
```
VITE_API_URL = https://learnquizzy.onrender.com
VITE_SOCKET_URL = https://learnquizzy.onrender.com
```

### Backend (Render)
```
MONGODB_URI = mongodb+srv://...
GEMINI_API_KEY = AIzaSy...
NODE_ENV = production
PORT = 5000
```

---

## 🚀 Request Flow Example

**User creates quiz about "React Hooks":**

1. User fills form → Clicks "Generate"
2. Frontend: `POST https://learnquizzy.onrender.com/api/quiz/generate`
3. Backend validates input
4. Backend calls Gemini AI with prompt
5. Gemini returns quiz JSON
6. Backend saves to MongoDB
7. Backend returns quiz ID: `xyz789`
8. Frontend redirects to: `/quiz/xyz789`
9. User shares link with friends
10. Friends attempt quiz
11. Leaderboard updates in real-time for everyone!

---

## 💡 Why It's Special

- **No manual quiz creation** - AI does everything
- **Instant sharing** - Copy link, send anywhere
- **No login friction** - Anyone can play
- **Competitive** - Leaderboard with time tracking
- **Educational** - AI explanations for learning
- **Viral potential** - Easy to share on WhatsApp/Twitter

---

## 🎮 Try It Yourself

1. Visit: https://learn-quizzy.vercel.app/
2. Click "Start Creating"
3. Enter any topic
4. Get shareable link
5. Share with friends
6. Watch leaderboard update live!

---

## 🛠️ Tech Stack Summary

- **Frontend**: React + Vite (Vercel)
- **Backend**: Node.js + Express (Render)
- **Database**: MongoDB (Atlas)
- **AI**: Google Gemini 2.5 Flash
- **Real-time**: Socket.io
- **Routing**: React Router
- **HTTP**: Axios
- **Styling**: Pure CSS (Dark theme)

---

## 📊 Database Schema

**Quiz Collection:**
```javascript
{
  quizId: "abc123",
  title: "JavaScript Promises Quiz",
  prompt: "JavaScript Promises",
  toughness: "medium",
  questions: [
    {
      question: "What is a Promise?",
      options: ["A", "B", "C", "D"],
      correctAnswer: "A",
      explanation: "A Promise is..."
    }
  ],
  createdAt: Date
}
```

**Attempt Collection:**
```javascript
{
  quizId: "abc123",
  playerName: "John",
  score: 4,
  totalQuestions: 5,
  timeTaken: 120,
  answers: [
    { questionIndex: 0, selectedAnswer: "A", isCorrect: true }
  ],
  createdAt: Date
}
```

---

## 🔄 Real-Time Updates

**Socket.io Flow:**
```
User A submits quiz
       ↓
Backend saves attempt
       ↓
Backend emits: socket.emit('leaderboard-update')
       ↓
All connected users receive event
       ↓
Frontend fetches updated leaderboard
       ↓
UI updates automatically
```

---

That's it! Simple, powerful, and ready to scale. 🚀
