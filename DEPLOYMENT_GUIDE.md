# Deployment Guide - Vercel

## Step 1: Prepare Your Repository

1. **Push to GitHub** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - full stack portfolio"
   git remote add origin https://github.com/YOUR_USERNAME/Praveen_FullStack_Portfolio
   git branch -M main
   git push -u origin main
   ```

## Step 2: Set Up Environment Variables

1. Visit [Vercel Dashboard](https://vercel.com/dashboard)
2. Create a new project from your GitHub repository
3. Add the following environment variables in Vercel project settings:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A strong secret key for JWT
   - `EMAIL_USER`: Your email for notifications
   - `EMAIL_PASS`: Your app password (or generate one)

## Step 3: Update Your Backend for Vercel

Your backend needs to export the Express app for serverless functions:

**File: `backend/server.js`** - Modify the end of the file:

```javascript
// Instead of:
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// Use this for both local and Vercel:
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
```

## Step 4: Create Vercel API Routes

Create this file structure:

**File: `api/index.js`**:

```javascript
import app from "../backend/server.js";

export default app;
```

## Step 5: Update Frontend API Calls

In your frontend, update API endpoints:

```javascript
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// Replace all fetch calls like:
// fetch('http://localhost:5000/api/...')
// With:
fetch(`${API_URL}/api/...`);
```

## Step 6: Deploy to Vercel

1. **Connect your GitHub repo to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Select your GitHub repository
   - Click "Import"

2. **Configure project settings**:
   - Framework Preset: **Other**
   - Root Directory: **./frontend** (if using Next.js/React)
   - Build Command: `npm run build`
   - Output Directory: `.next` or `build`

3. **Add Environment Variables** in Vercel dashboard

4. **Deploy** - Click "Deploy"

## Step 7: Test Your Deployment

Once deployed, test:

- [ ] Frontend loads correctly
- [ ] API calls work (check Network tab in DevTools)
- [ ] Database connections work
- [ ] Authentication flows work
- [ ] Contact form sends emails

## Troubleshooting

**502/503 Errors**:

- Check Vercel logs: `vercel logs`
- Verify MONGO_URI is correct
- Ensure MongoDB Atlas IP whitelist includes Vercel IPs (add 0.0.0.0/0)

**CORS Issues**:

- Verify CORS is properly configured in backend
- Check allowed origins

**Database Connection Timeout**:

- Whitelist all IPs in MongoDB Atlas: 0.0.0.0/0
- Or add specific Vercel IP ranges

## Rolling Back

If you need to revert:

```bash
vercel rollback
```

## Custom Domain

To add your own domain:

1. In Vercel dashboard → Settings → Domains
2. Add your domain
3. Update DNS records as instructed
