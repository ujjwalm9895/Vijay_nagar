# Render Quick Start Guide

Deploy your portfolio to Render in 5 minutes! 🚀

## Method 1: Blueprint (Easiest - Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for Render deployment"
   git push origin main
   ```

2. **Go to Render Dashboard**
   - Sign up/Login at [render.com](https://render.com)
   - Click **New +** → **Blueprint**

3. **Connect Repository**
   - Connect your GitHub account
   - Select your repository
   - Render will detect `render.yaml`

4. **Review & Deploy**
   - Review the services (Database, Backend, Frontend)
   - Update service names if needed
   - Click **Apply**

5. **Set Admin Password**
   - Go to Backend service → **Environment**
   - Set `ADMIN_PASSWORD` to a strong password
   - Save changes (will auto-redeploy)

6. **Initialize Database**
   - Go to Backend service → **Shell**
   - Run: `npx prisma migrate deploy`
   - Run: `npm run seed` (optional)

7. **Update Frontend URL**
   - After frontend deploys, note its URL
   - Go to Backend → **Environment**
   - Update `FRONTEND_URL` with frontend URL
   - Save (auto-redeploys)

**Done!** Your portfolio is live! 🎉

## Method 2: Manual Setup

### Step 1: Database (2 minutes)

1. Render Dashboard → **New +** → **PostgreSQL**
2. Name: `vijay-nagar-db`
3. Plan: Free
4. Click **Create**
5. **Copy the Internal Database URL** (you'll need it)

### Step 2: Backend (3 minutes)

1. **New +** → **Web Service**
2. Connect GitHub repo
3. Settings:
   - **Name**: `vijay-nagar-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build && npx prisma generate`
   - **Start Command**: `npm start`
   - **Plan**: Free

4. **Environment Variables**:
   ```
   DATABASE_URL=<paste-internal-database-url>
   JWT_SECRET=<generate-random-32-char-string>
   JWT_EXPIRES_IN=7d
   PORT=10000
   NODE_ENV=production
   FRONTEND_URL=https://vijay-nagar-frontend.onrender.com
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=<your-strong-password>
   ```

5. Click **Create Web Service**

6. **After first deploy**, in Shell:
   ```bash
   npx prisma migrate deploy
   npm run seed
   ```

### Step 3: Frontend (2 minutes)

**Important**: Deploy as **Web Service** (not Static Site) for admin dashboard

1. **New +** → **Web Service**
2. Connect GitHub repo
3. Settings:
   - **Name**: `vijay-nagar-frontend`
   - **Root Directory**: `frontend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

4. **Environment Variables**:
   ```
   NEXT_PUBLIC_API_URL=https://vijay-nagar-backend.onrender.com/api
   NEXT_PUBLIC_SITE_URL=https://vijay-nagar-frontend.onrender.com
   ```

5. Click **Create Web Service**

6. **Update Backend CORS**:
   - Go to Backend → Environment
   - Update `FRONTEND_URL` with frontend URL
   - Save

## 🔑 Generate JWT Secret

Use this command to generate a secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Or use an online generator: https://generate-secret.vercel.app/32

## ✅ Verify Deployment

1. **Backend Health**: `https://your-backend.onrender.com/api/health`
2. **Frontend**: `https://your-frontend.onrender.com`
3. **Admin Dashboard**: `https://your-frontend.onrender.com/admin`
4. **Admin Login**: Use your admin credentials

### 🎨 Access Admin Dashboard

After deployment, access the CMS admin interface:
- **URL**: `https://your-frontend.onrender.com/admin`
- **Login**: Use your admin email and password
- **Features**: Beautiful web interface for managing content

## 🐛 Common Issues

**Backend won't start:**
- Check build logs
- Verify `DATABASE_URL` is correct
- Ensure migrations ran: `npx prisma migrate deploy`

**Frontend can't connect to API:**
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check backend is running
- Verify CORS settings

**Database connection error:**
- Use Internal Database URL (not External)
- Check database is running
- Verify connection string format

## 📚 Next Steps

- [ ] Customize your content
- [ ] Set up custom domain (optional)
- [ ] Configure email notifications
- [ ] Set up monitoring

## 💡 Pro Tips

1. **Free tier spins down** after 15 min inactivity
   - First request may be slow
   - Consider paid plan for production

2. **Database backups** are automatic on paid plans
   - Free tier: 7-day retention

3. **Custom domains** are free
   - Add in service settings
   - Update DNS records

4. **Environment variables** can be synced
   - Use same values across services
   - Use Render's secret management

---

**Need help?** Check [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md) for detailed guide.
