# 🚀 Deploy Now - Quick Guide

Your code is on GitHub! Now deploy in 3 steps:

## 1️⃣ MongoDB Atlas - ALREADY DONE! ✅

**Good news!** You already have MongoDB Atlas set up. I've configured it to use your existing cluster with a new database called `learnquizzy`.

**Your connection string (already in server/.env):**
```
mongodb+srv://concept:Vy5Fcsm7Yg7c1vDi@cluster0.o854obv.mongodb.net/learnquizzy?appName=Cluster0
```

This creates a new database `learnquizzy` in your existing cluster. Your old `myDB` database is untouched!

**For future projects:** Just change `/learnquizzy` to `/your-new-project-name`. See `HOW_TO_REUSE_MONGODB.md` for details.

---

## 2️⃣ Render Backend (5 minutes)

1. Go to https://dashboard.render.com/
2. Click "New +" → "Web Service"
3. Connect your GitHub: `Anupkumarpandey1/LearnQuizzy`
4. Configure:
   - **Name**: `learnquizzy-api`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`

5. Click "Advanced" → Add Environment Variables:
   ```
   MONGODB_URI = mongodb+srv://concept:Vy5Fcsm7Yg7c1vDi@cluster0.o854obv.mongodb.net/learnquizzy?appName=Cluster0
   GEMINI_API_KEY = AIzaSyCwbWxepccxj0MEUqg0m6_mKecZRWNiPa4
   NODE_ENV = production
   PORT = 5000
   ```

6. Click "Create Web Service"
7. Wait 2-3 minutes for deployment
8. **Copy your Render URL** (e.g., `https://learnquizzy-api.onrender.com`)

---

## 3️⃣ Vercel Frontend (3 minutes)

1. Go to https://vercel.com/new
2. Import your GitHub repo: `Anupkumarpandey1/LearnQuizzy`
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)

4. Add Environment Variables:
   ```
   VITE_API_URL = (paste your Render URL from step 2)
   VITE_SOCKET_URL = (paste your Render URL from step 2)
   ```

5. Click "Deploy"
6. Wait 1-2 minutes
7. **Copy your Vercel URL** (e.g., `https://learnquizzy.vercel.app`)

---

## 4️⃣ Final Step - Update Backend CORS

1. Go back to Render dashboard
2. Open your `learnquizzy-api` service
3. Go to "Environment" tab
4. Add new variable:
   ```
   FRONTEND_URL = (paste your Vercel URL from step 3)
   ```
5. Click "Save Changes"
6. Wait 1 minute for auto-redeploy

---

## ✅ Test Your Live App

1. Visit your Vercel URL
2. Click "Start Creating"
3. Generate a quiz
4. Share the link with friends
5. Check the leaderboard updates in real-time

---

## 🎉 You're Live!

Your app is now deployed on:
- Frontend: Your Vercel URL
- Backend: Your Render URL
- Database: MongoDB Atlas

**Note:** Render free tier sleeps after 15 min of inactivity. First request after sleep takes ~30 seconds to wake up.

---

## 🐛 Troubleshooting

**CORS Error?**
→ Make sure `FRONTEND_URL` in Render matches your Vercel URL exactly (with https://)

**Quiz generation fails?**
→ Check Render logs, verify `GEMINI_API_KEY` is set correctly

**Can't connect to MongoDB?**
→ Verify connection string format and Network Access allows 0.0.0.0/0

**Socket.io not working?**
→ Wait 30 seconds for Render to wake up from sleep

---

## 📱 Share Your Project

Once deployed, share your live URL:
- Add to your resume
- Share on LinkedIn
- Tweet about it
- Add to your portfolio

**Resume Line:**
"Built and deployed an AI-powered quiz generation SaaS with real-time leaderboards, shareable links, and guest attempts using React, Node.js, MongoDB, Socket.io, and Gemini AI."
