# 🚀 Deployment Guide

## Prerequisites
- MongoDB Atlas account (free tier works)
- Vercel account (for frontend)
- Render account (for backend)

## Step 1: MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
5. Replace `<password>` with your actual password
6. Add database name at the end: `mongodb+srv://username:password@cluster.mongodb.net/learnquizzy`
7. In "Network Access", add `0.0.0.0/0` to allow connections from anywhere

## Step 2: Deploy Backend to Render

1. Push your code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click "New +" → "Web Service"
4. Connect your GitHub repo
5. Configure:
   - Name: `learnquizzy-api`
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `node server.js`
6. Add Environment Variables:
   - `MONGODB_URI` = (your Atlas connection string)
   - `GEMINI_API_KEY` = `AIzaSyCwbWxepccxj0MEUqg0m6_mKecZRWNiPa4`
   - `NODE_ENV` = `production`
   - `FRONTEND_URL` = (leave blank for now, add after Vercel deploy)
7. Click "Create Web Service"
8. Copy your Render URL (e.g., `https://learnquizzy-api.onrender.com`)

## Step 3: Deploy Frontend to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your GitHub repo
4. Configure:
   - Framework Preset: Vite
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add Environment Variables:
   - `VITE_API_URL` = (your Render URL from Step 2)
   - `VITE_SOCKET_URL` = (your Render URL from Step 2)
6. Click "Deploy"
7. Copy your Vercel URL (e.g., `https://learnquizzy.vercel.app`)

## Step 4: Update Backend with Frontend URL

1. Go back to Render dashboard
2. Open your `learnquizzy-api` service
3. Go to "Environment" tab
4. Add/Update:
   - `FRONTEND_URL` = (your Vercel URL from Step 3)
5. Save changes (Render will auto-redeploy)

## Step 5: Test

1. Visit your Vercel URL
2. Create a quiz
3. Share the link with friends
4. Check if leaderboard updates in real-time

## Troubleshooting

**CORS errors?**
- Make sure `FRONTEND_URL` is set correctly in Render
- Check that both URLs are using HTTPS in production

**Socket.io not connecting?**
- Render free tier may have cold starts (first request takes 30s)
- Check browser console for connection errors

**Quiz generation fails?**
- Verify `GEMINI_API_KEY` is set in Render
- Check Render logs for errors

**MongoDB connection fails?**
- Verify connection string format
- Check Network Access in Atlas (should allow 0.0.0.0/0)
- Ensure password doesn't have special characters (or URL encode them)

## Free Tier Limits

- Render: 750 hours/month (enough for 1 service)
- Vercel: Unlimited hobby projects
- MongoDB Atlas: 512MB storage (plenty for thousands of quizzes)
- Render free tier sleeps after 15 min inactivity (first request takes ~30s to wake)

## Custom Domain (Optional)

**Vercel:**
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

**Render:**
1. Go to Settings → Custom Domain
2. Add your domain
3. Update DNS CNAME record
