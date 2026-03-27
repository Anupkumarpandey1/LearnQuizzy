# 🚀 Quick Deployment Checklist

## Before You Deploy

- [ ] Push code to GitHub
- [ ] Create MongoDB Atlas account
- [ ] Create Render account  
- [ ] Create Vercel account

## MongoDB Atlas (5 min)

- [ ] Create free cluster
- [ ] Get connection string
- [ ] Add `0.0.0.0/0` to Network Access
- [ ] Replace password in connection string
- [ ] Add database name: `/learnquizzy`

## Render Backend (10 min)

- [ ] Create new Web Service
- [ ] Connect GitHub repo
- [ ] Set Root Directory: `server`
- [ ] Set Build Command: `npm install`
- [ ] Set Start Command: `node server.js`
- [ ] Add Environment Variables:
  - [ ] `MONGODB_URI` = (Atlas connection string)
  - [ ] `GEMINI_API_KEY` = `AIzaSyCwbWxepccxj0MEUqg0m6_mKecZRWNiPa4`
  - [ ] `NODE_ENV` = `production`
- [ ] Deploy and copy URL

## Vercel Frontend (5 min)

- [ ] Import GitHub repo
- [ ] Set Root Directory: `client`
- [ ] Framework: Vite
- [ ] Add Environment Variables:
  - [ ] `VITE_API_URL` = (Render URL)
  - [ ] `VITE_SOCKET_URL` = (Render URL)
- [ ] Deploy and copy URL

## Final Step

- [ ] Go back to Render
- [ ] Add `FRONTEND_URL` = (Vercel URL)
- [ ] Wait for auto-redeploy
- [ ] Test your live app!

## Test Checklist

- [ ] Homepage loads
- [ ] Can create a quiz
- [ ] Quiz page works
- [ ] Can submit answers
- [ ] Results page shows
- [ ] Leaderboard displays
- [ ] Share link works
- [ ] Real-time updates work

## Common Issues

**CORS Error?**
→ Check `FRONTEND_URL` in Render matches your Vercel URL exactly

**Socket not connecting?**
→ Render free tier has cold starts (first request takes 30s)

**Quiz generation fails?**
→ Check Render logs, verify `GEMINI_API_KEY` is set

**Can't connect to MongoDB?**
→ Verify connection string format and Network Access settings

## Free Tier Notes

- Render sleeps after 15 min inactivity
- First request after sleep takes ~30 seconds
- MongoDB Atlas: 512MB storage (thousands of quizzes)
- Vercel: Unlimited deployments

## Need Help?

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions with screenshots.
