# Deployment Guide - Vercel (Frontend) + Render (Backend)

Complete guide to deploy your portfolio using Vercel for frontend and Render for backend.

## 🚀 Overview

This hybrid approach uses:
- **Frontend**: Vercel (Next.js optimized hosting)
- **Backend**: Render (Node.js/Express API)
- **Database**: Render PostgreSQL (Managed)

## Why This Setup?

- **Vercel**: Best-in-class Next.js hosting with edge functions, instant deployments, and global CDN
- **Render**: Reliable backend hosting with managed PostgreSQL
- **Cost-effective**: Both offer generous free tiers

## 📋 Prerequisites

1. GitHub account
2. Vercel account (sign up at [vercel.com](https://vercel.com))
3. Render account (sign up at [render.com](https://render.com))
4. Code pushed to a GitHub repository

## 🗄️ Step 1: Set Up PostgreSQL Database on Render

1. Go to Render Dashboard → **New +** → **PostgreSQL**
2. Configure:
   - **Name**: `vijay-nagar-db`
   - **Database**: `vijay_nagar_db`
   - **User**: (auto-generated)
   - **Region**: Choose closest to you
   - **PostgreSQL Version**: 16
   - **Plan**: Free tier (or paid for production)

3. Click **Create Database**

4. **Save the connection string**:
   - Go to Database → **Connections**
   - Copy the **Internal Database URL** (for backend)
   - Format: `postgresql://user:password@host:port/dbname`

## 🔧 Step 2: Deploy Backend API on Render

1. Go to Render Dashboard → **New +** → **Web Service**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `vijay-nagar-backend`
   - **Region**: Same as database
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build && npx prisma generate`
   - **Start Command**: `npm start`
   - **Plan**: Free tier (or paid for production)

4. **Environment Variables**:
   ```
   DATABASE_URL=<paste-internal-database-url>
   JWT_SECRET=<generate-a-strong-random-secret-32-chars>
   JWT_EXPIRES_IN=7d
   PORT=10000
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend.vercel.app
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=<your-strong-password>
   ```

   **Generate JWT_SECRET:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

5. **Advanced Settings**:
   - Enable **Auto-Deploy**: Yes
   - Health Check Path: `/api/health`

6. Click **Create Web Service**

7. **After first deployment**, initialize database:
   - Go to your backend service → **Shell** tab
   - Run: `npx prisma migrate deploy`
   - Run: `npm run seed` (optional, to seed initial data)

8. **Note your backend URL**: `https://vijay-nagar-backend.onrender.com`

## 🎨 Step 3: Deploy Frontend on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **Add New Project**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (or leave default)
   - **Output Directory**: `.next` (or leave default)
   - **Install Command**: `npm install` (or leave default)

5. **Environment Variables** (click **Environment Variables**):
   ```
   NEXT_PUBLIC_API_URL=https://vijay-nagar-backend.onrender.com/api
   NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
   ```

6. Click **Deploy**

7. **After deployment**, note your Vercel URL: `https://your-project.vercel.app`

## 🔄 Step 4: Update Backend CORS

After frontend is deployed on Vercel:

1. Go to Render Dashboard → Your Backend Service → **Environment** tab
2. Update `FRONTEND_URL` with your Vercel URL:
   ```
   FRONTEND_URL=https://your-project.vercel.app
   ```
3. Click **Save Changes** (will auto-redeploy)

## 🔐 Step 5: Initialize Database

1. Go to your backend service on Render → **Shell** tab
2. Run migrations:
   ```bash
   npx prisma migrate deploy
   ```
3. (Optional) Seed initial data:
   ```bash
   npm run seed
   ```

## 📝 Environment Variables Summary

### Backend (Render)

```env
DATABASE_URL=postgresql://user:pass@host:port/dbname
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_EXPIRES_IN=7d
PORT=10000
NODE_ENV=production
FRONTEND_URL=https://your-project.vercel.app
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your-strong-password
```

### Frontend (Vercel)

```env
NEXT_PUBLIC_API_URL=https://vijay-nagar-backend.onrender.com/api
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
```

## 🚀 Custom Domain Setup

### Vercel (Frontend)

1. Go to Vercel Dashboard → Your Project → **Settings** → **Domains**
2. Add your domain (e.g., `yourdomain.com`)
3. Update DNS records as instructed
4. Update environment variable:
   ```
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   ```

### Render (Backend)

1. Go to Render Dashboard → Your Backend Service → **Settings** → **Custom Domains**
2. Add your subdomain (e.g., `api.yourdomain.com`)
3. Update DNS records
4. Update environment variables:
   - Backend: Update `FRONTEND_URL` if needed
   - Frontend: Update `NEXT_PUBLIC_API_URL` to `https://api.yourdomain.com/api`

## 🔍 Troubleshooting

### Backend Issues (Render)

**Database Connection Error:**
- Verify `DATABASE_URL` uses **Internal Database URL** (not External)
- Check database is running
- Ensure database and backend are in same region

**CORS Errors:**
- Verify `FRONTEND_URL` matches your Vercel URL exactly
- Check for trailing slashes
- Ensure backend has redeployed after updating `FRONTEND_URL`

**Build Fails:**
- Check build logs in Render dashboard
- Verify all dependencies in `package.json`
- Check TypeScript errors

### Frontend Issues (Vercel)

**API Calls Failing:**
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check backend is running on Render
- Verify CORS settings in backend
- Check browser console for errors
- Ensure environment variables are set in Vercel

**Build Fails:**
- Check build logs in Vercel dashboard
- Verify all environment variables are set
- Check for TypeScript errors
- Ensure Next.js version is compatible

**Environment Variables Not Working:**
- Variables must start with `NEXT_PUBLIC_` to be accessible in browser
- Redeploy after adding/changing variables
- Check Vercel dashboard → Settings → Environment Variables

## 💰 Free Tier Limitations

### Render
- **Web Services**: Spins down after 15 min inactivity (first request may be slow)
- **PostgreSQL**: 90-day retention (free tier)

### Vercel
- **Bandwidth**: 100GB/month (free tier)
- **Builds**: Unlimited
- **Always on**: Yes (no spin-down)

**For Production**: Consider paid plans for:
- Always-on backend (Render)
- Better performance
- More resources
- Database backups

## 🔄 Auto-Deploy

### Vercel
- Automatically deploys on push to connected branch
- Preview deployments for pull requests
- Instant rollbacks

### Render
- Automatically deploys on push to connected branch
- Manual deploy available
- Health checks enabled

## 📊 Monitoring

### Vercel
- **Analytics**: Available in dashboard
- **Logs**: Real-time function logs
- **Performance**: Web Vitals tracking

### Render
- **Logs**: View in dashboard
- **Metrics**: Available in paid plans
- **Health Checks**: Automatic

## ✅ Deployment Checklist

- [ ] PostgreSQL database created on Render
- [ ] Backend service deployed on Render
- [ ] Environment variables set in Render
- [ ] Database migrations run (`npx prisma migrate deploy`)
- [ ] Database seeded (optional)
- [ ] Frontend deployed on Vercel
- [ ] Environment variables set in Vercel
- [ ] Backend `FRONTEND_URL` updated with Vercel URL
- [ ] CORS configured correctly
- [ ] Health check passing
- [ ] Admin login working
- [ ] API endpoints accessible
- [ ] Custom domain configured (optional)

## 🎯 Post-Deployment

1. **Test Admin Login:**
   - Go to `https://your-backend.onrender.com/api/auth/login`
   - Use your admin credentials

2. **Verify API Endpoints:**
   - Health: `https://your-backend.onrender.com/api/health`
   - Publications: `https://your-backend.onrender.com/api/publications`

3. **Test Frontend:**
   - Visit your Vercel URL
   - Check all pages load correctly
   - Verify API calls work
   - Test dark mode
   - Check mobile responsiveness

4. **Monitor:**
   - Check Vercel analytics
   - Monitor Render logs
   - Set up alerts if needed

## 🚀 Quick Deploy Commands

### Render (Backend)
```bash
# After connecting GitHub, Render auto-deploys
# Just update environment variables and run migrations
```

### Vercel (Frontend)
```bash
# Install Vercel CLI (optional)
npm i -g vercel

# Deploy from frontend directory
cd frontend
vercel

# Or use GitHub integration (recommended)
```

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Node.js on Render](https://render.com/docs/node)

---

Your portfolio is now live on Vercel + Render! 🎉

**Frontend**: `https://your-project.vercel.app`  
**Backend**: `https://your-backend.onrender.com`
