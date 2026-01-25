# Render Deployment Guide

Complete guide to deploy your portfolio on Render.com.

## 🚀 Overview

Render supports:
- **Frontend**: Static Site (Next.js)
- **Backend**: Web Service (Node.js/Express)
- **Database**: PostgreSQL (Managed PostgreSQL)

## 📋 Prerequisites

1. GitHub account
2. Render account (sign up at [render.com](https://render.com))
3. Push your code to a GitHub repository

## 🗄️ Step 1: Set Up PostgreSQL Database

1. Go to Render Dashboard → **New +** → **PostgreSQL**
2. Configure:
   - **Name**: `vijay-nagar-db`
   - **Database**: `vijay_nagar_db`
   - **User**: (auto-generated)
   - **Region**: Choose closest to you
   - **PostgreSQL Version**: 16
   - **Plan**: Free tier (or paid for production)

3. **Save the connection string** - You'll need it for the backend:
   - Format: `postgresql://user:password@host:port/dbname`

## 🔧 Step 2: Deploy Backend API

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
   DATABASE_URL=<your-postgresql-connection-string>
   JWT_SECRET=<generate-a-strong-random-secret>
   JWT_EXPIRES_IN=7d
   PORT=10000
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-name.onrender.com
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=<strong-password>
   ```

5. **Advanced Settings**:
   - Enable **Auto-Deploy**: Yes
   - Health Check Path: `/api/health`

6. Click **Create Web Service**

7. **After first deployment**, run migrations:
   - Go to your service → **Shell**
   - Run: `npx prisma migrate deploy`
   - Run: `npm run seed` (optional, to seed initial data)

## 🎨 Step 3: Deploy Frontend

1. Go to Render Dashboard → **New +** → **Static Site**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `vijay-nagar-frontend`
   - **Branch**: `main`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `.next`

4. **Environment Variables**:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-name.onrender.com/api
   NEXT_PUBLIC_SITE_URL=https://your-frontend-name.onrender.com
   ```

5. Click **Create Static Site**

## 🔄 Step 4: Update Backend CORS

After frontend is deployed, update backend environment variable:
```
FRONTEND_URL=https://your-frontend-name.onrender.com
```

Then redeploy the backend service.

## 🔐 Step 5: Initialize Database

1. Go to your backend service → **Shell**
2. Run migrations:
   ```bash
   npx prisma migrate deploy
   ```
3. (Optional) Seed initial data:
   ```bash
   npm run seed
   ```

## 📝 Environment Variables Summary

### Backend (.env on Render)
```env
DATABASE_URL=postgresql://user:pass@host:port/dbname
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_EXPIRES_IN=7d
PORT=10000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-name.onrender.com
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your-strong-password
```

### Frontend (Environment Variables on Render)
```env
NEXT_PUBLIC_API_URL=https://your-backend-name.onrender.com/api
NEXT_PUBLIC_SITE_URL=https://your-frontend-name.onrender.com
```

## 🛠️ Render-Specific Configuration

### Backend Build Settings

**Build Command:**
```bash
npm install && npm run build && npx prisma generate
```

**Start Command:**
```bash
npm start
```

**Health Check Path:**
```
/api/health
```

### Frontend Build Settings

**Build Command:**
```bash
npm install && npm run build
```

**Publish Directory:**
```
.next
```

## 🔍 Troubleshooting

### Backend Issues

**Database Connection Error:**
- Verify `DATABASE_URL` is correct
- Check database is running
- Ensure database allows connections from Render IPs

**Build Fails:**
- Check build logs in Render dashboard
- Ensure `package.json` has all dependencies
- Verify Node.js version (Render uses Node 20 by default)

**Migrations Not Running:**
- Run manually in Shell: `npx prisma migrate deploy`
- Check Prisma schema is valid

### Frontend Issues

**API Calls Failing:**
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check backend is running
- Verify CORS settings in backend

**Build Fails:**
- Check build logs
- Ensure all environment variables are set
- Verify Next.js version compatibility

## 🚀 Custom Domain (Optional)

1. Go to your service → **Settings** → **Custom Domains**
2. Add your domain
3. Update DNS records as instructed
4. Update environment variables with new domain

## 📊 Monitoring

- **Logs**: View in Render dashboard
- **Metrics**: Available in paid plans
- **Alerts**: Set up in service settings

## 🔄 Auto-Deploy

Render automatically deploys on:
- Push to connected branch
- Manual deploy from dashboard

To disable: Settings → Auto-Deploy → Disable

## 💰 Free Tier Limitations

- **Web Services**: Spins down after 15 min inactivity
- **PostgreSQL**: 90-day retention (free tier)
- **Static Sites**: Unlimited

**For Production**: Consider paid plans for:
- Always-on services
- Better performance
- More resources

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [Node.js on Render](https://render.com/docs/node)
- [PostgreSQL on Render](https://render.com/docs/databases)

## ✅ Deployment Checklist

- [ ] PostgreSQL database created
- [ ] Backend service deployed
- [ ] Database migrations run
- [ ] Frontend service deployed
- [ ] Environment variables set correctly
- [ ] CORS configured
- [ ] Health check passing
- [ ] Admin login working
- [ ] Custom domain configured (optional)

---

Your portfolio should now be live on Render! 🎉
