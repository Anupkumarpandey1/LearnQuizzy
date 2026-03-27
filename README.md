# 🧠 LearnQuizzy

AI-powered quiz generation platform with real-time leaderboards. Create quizzes from any prompt, share with friends, and compete!

## Features

- 🤖 AI-generated quizzes using Gemini 2.5 Pro
- 🔗 Shareable quiz links (no login required to attempt)
- 🏆 Real-time leaderboards with Socket.io
- ⏱️ Timer tracking for competitive scoring
- 💡 AI explanations for each answer
- 🎯 Configurable difficulty and question count

## Setup

### Prerequisites
- Node.js 18+
- MongoDB running locally or connection string

### Installation

```bash
# Install all dependencies
npm run install-all

# Start MongoDB (if local)
mongod

# Run both client and server
npm run dev
```

The app will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

### Environment Variables

Server `.env` is already configured with your Gemini API key. Update `MONGODB_URI` if needed.

## Usage

1. Go to homepage → Enter quiz topic, difficulty, questions count
2. AI generates quiz → Get shareable link
3. Share link with friends → They attempt without login
4. View live leaderboard with scores and times

## API Routes

- `POST /api/quiz/generate` - Generate new quiz
- `GET /api/quiz/:quizId` - Fetch quiz (without answers)
- `POST /api/quiz/:quizId/attempt` - Submit attempt
- `GET /api/quiz/:quizId/leaderboard` - Get top scores

## Tech Stack

- React + Vite
- Express + Socket.io
- MongoDB + Mongoose
- Google Gemini AI
- Axios for HTTP requests

## Resume Line

"Built an AI-powered quiz generation SaaS where users create shareable quizzes from any prompt with configurable difficulty — featuring real-time leaderboards, guest attempts, and AI-generated explanations using Gemini API."

## 📚 Documentation

- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Complete deployment guide for Vercel + Render + Atlas
- **[DEPLOY_CHECKLIST.md](DEPLOY_CHECKLIST.md)** - Quick deployment checklist

## Local Development

### Prerequisites
- Node.js 18+
- MongoDB running locally or Atlas connection string

### Installation

```bash
# Install all dependencies
npm run install-all

# Start MongoDB (if local)
mongod

# Run both client and server
npm run dev
```

The app will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

### Environment Variables

Server `.env` is already configured with your Gemini API key. Update `MONGODB_URI` if needed.

## 🚀 Production Deployment

This project is ready to deploy to:
- **Frontend**: Vercel (free tier)
- **Backend**: Render (free tier)  
- **Database**: MongoDB Atlas (free tier)

Quick start: See [DEPLOY_CHECKLIST.md](./DEPLOY_CHECKLIST.md)  
Detailed guide: See [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🎯 What Makes This Special

1. **Original Idea** - Not a clone, genuinely useful
2. **AI Integration** - Real Gemini API usage
3. **Real-Time** - Socket.io leaderboards
4. **Shareable** - Viral potential with links
5. **Complete** - Frontend + Backend + DB
6. **Scalable** - Production-ready architecture
7. **Deploy-Ready** - Configured for Vercel + Render + Atlas
