# Deployment Guide - Render.com

Complete guide to deploy your portfolio on Render.com.

## 🚀 Overview

This guide covers deploying:
- **Frontend**: Static Site or Web Service (Next.js)
- **Backend**: Web Service (Node.js/Express)
- **Database**: Managed PostgreSQL

## 📋 Prerequisites

1. GitHub account
2. Render account (sign up at [render.com](https://render.com))
3. Code pushed to a GitHub repository

## 🗄️ Step 1: Set Up PostgreSQL Database

1. Go to Render Dashboard → **New +** → **PostgreSQL**
2. Configure:
   - **Name**: `vijay-nagar-db`
   - **Database**: `vijay_nagar_db`
   - **User**: (auto-generated)
   - **Region**: Choose closest to you (e.g., `oregon`, `frankfurt`)
   - **PostgreSQL Version**: 16
   - **Plan**: Free tier (or paid for production)

3. Click **Create Database**

4. **Save the connection string**:
   - Go to Database → **Connections**
   - Copy the **Internal Database URL** (use this for backend)
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

4. **Environment Variables** (click **Advanced** → **Add Environment Variable**):
   ```
   DATABASE_URL=<paste-internal-database-url-from-step-1>
   JWT_SECRET=<generate-a-strong-random-secret-32-chars>
   JWT_EXPIRES_IN=7d
   PORT=10000
   NODE_ENV=production
   FRONTEND_URL=https://vijay-nagar-frontend.onrender.com
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

## 🎨 Step 3: Deploy Frontend

### Option A: Static Site (Recommended for Next.js)

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
   NEXT_PUBLIC_API_URL=https://vijay-nagar-backend.onrender.com/api
   NEXT_PUBLIC_SITE_URL=https://vijay-nagar-frontend.onrender.com
   ```

5. Click **Create Static Site**

### Option B: Web Service (Alternative)

1. Go to Render Dashboard → **New +** → **Web Service**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `vijay-nagar-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free tier

4. **Environment Variables** (same as Option A)

5. Click **Create Web Service**

## 🔄 Step 4: Update Backend CORS

After frontend is deployed:

1. Note your frontend URL (e.g., `https://vijay-nagar-frontend.onrender.com`)
2. Go to Backend service → **Environment** tab
3. Update `FRONTEND_URL` with your frontend URL
4. Click **Save Changes** (will auto-redeploy)

## 🔐 Step 5: Initialize Database

1. Go to your backend service → **Shell** tab
2. Run migrations:
   ```bash
   npx prisma migrate deploy
   ```
3. (Optional) Seed initial data:
   ```bash
   npm run seed
   ```

## 📝 Environment Variables Summary

### Backend Environment Variables

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

### Frontend Environment Variables

```env
NEXT_PUBLIC_API_URL=https://your-backend-name.onrender.com/api
NEXT_PUBLIC_SITE_URL=https://your-frontend-name.onrender.com
```

## 🚀 Quick Deploy with Blueprint

For fastest deployment, use Render Blueprint:

1. Push code to GitHub
2. Go to Render Dashboard → **New +** → **Blueprint**
3. Connect your repository
4. Render will detect `render.yaml` and set up all services
5. Review configuration and click **Apply**
6. Set `ADMIN_PASSWORD` manually in backend environment
7. Run migrations in backend Shell

See `render.yaml` for blueprint configuration.

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

### Frontend Build Settings (Static Site)

**Build Command:**
```bash
npm install && npm run build
```

**Publish Directory:**
```
.next
```

### Frontend Build Settings (Web Service)

**Build Command:**
```bash
npm install && npm run build
```

**Start Command:**
```bash
npm start
```

## 🔍 Troubleshooting

### Backend Issues

**Database Connection Error:**
- Verify `DATABASE_URL` uses **Internal Database URL** (not External)
- Check database is running in Render dashboard
- Ensure database and backend are in same region

**Build Fails:**
- Check build logs in Render dashboard
- Ensure `package.json` has all dependencies
- Verify Node.js version (Render uses Node 20 by default)
- Check for TypeScript errors

**Migrations Not Running:**
- Run manually in Shell: `npx prisma migrate deploy`
- Check Prisma schema is valid
- Verify database connection

**Service Won't Start:**
- Check logs in Render dashboard
- Verify `PORT` environment variable (should be `10000` for Render)
- Check for runtime errors

### Frontend Issues

**API Calls Failing:**
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check backend is running
- Verify CORS settings in backend (`FRONTEND_URL`)
- Check browser console for errors

**Build Fails:**
- Check build logs
- Ensure all environment variables are set
- Verify Next.js version compatibility
- Check for TypeScript errors

**Static Site Not Updating:**
- Trigger manual deploy
- Check build logs
- Verify publish directory is correct

### Database Issues

**Connection Timeout:**
- Use Internal Database URL (not External)
- Ensure database and backend are in same region
- Check database is running

**Migration Errors:**
- Check database connection
- Verify schema is valid
- Run `npx prisma migrate deploy` in Shell

## 🚀 Custom Domain (Optional)

1. Go to your service → **Settings** → **Custom Domains**
2. Add your domain (e.g., `api.yourdomain.com`)
3. Update DNS records as instructed by Render
4. Update environment variables with new domain:
   - Backend: Update `FRONTEND_URL`
   - Frontend: Update `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_SITE_URL`

## 📊 Monitoring

- **Logs**: View in Render dashboard → Service → **Logs** tab
- **Metrics**: Available in paid plans
- **Alerts**: Set up in service settings
- **Health Checks**: Automatic for web services

## 🔄 Auto-Deploy

Render automatically deploys on:
- Push to connected branch
- Manual deploy from dashboard

To disable: Settings → **Auto-Deploy** → Disable

## 💰 Free Tier Limitations

- **Web Services**: Spins down after 15 min inactivity (first request may be slow)
- **PostgreSQL**: 90-day retention (free tier)
- **Static Sites**: Unlimited, always on

**For Production**: Consider paid plans for:
- Always-on services (no spin-down)
- Better performance
- More resources
- Database backups

## 🔒 Security Checklist

- [ ] Change default admin credentials
- [ ] Use strong `JWT_SECRET` (32+ characters)
- [ ] Enable HTTPS (automatic on Render)
- [ ] Set `NODE_ENV=production`
- [ ] Configure CORS properly (`FRONTEND_URL`)
- [ ] Use environment variables (never commit secrets)
- [ ] Set up database backups (paid plans)
- [ ] Review and restrict admin endpoints

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [Node.js on Render](https://render.com/docs/node)
- [PostgreSQL on Render](https://render.com/docs/databases)
- [Static Sites on Render](https://render.com/docs/static-sites)

## ✅ Deployment Checklist

- [ ] PostgreSQL database created
- [ ] Backend service deployed
- [ ] Environment variables set correctly
- [ ] Database migrations run (`npx prisma migrate deploy`)
- [ ] Database seeded (optional)
- [ ] Frontend service deployed
- [ ] Frontend environment variables set
- [ ] Backend `FRONTEND_URL` updated
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
   - Visit your frontend URL
   - Check all pages load correctly
   - Verify API calls work

4. **Monitor Logs:**
   - Check for any errors
   - Monitor performance

---

Your portfolio should now be live on Render! 🎉

For quick start, see [RENDER_QUICKSTART.md](RENDER_QUICKSTART.md)
