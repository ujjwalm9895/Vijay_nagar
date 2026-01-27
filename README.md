# Vijay Nagar - Portfolio Website

A modern, production-ready personal portfolio website for a Computer Vision Engineer & Applied AI Researcher. Built with Next.js, TypeScript, Node.js, and PostgreSQL.

## 🚀 Tech Stack

### Frontend
- **Next.js 16+** (App Router)
- **TypeScript**
- **Tailwind CSS 4**
- **Framer Motion** (animations)
- **Radix UI** components
- **next-themes** (dark mode)
- Responsive (mobile-first)
- SEO optimized (metadata, OpenGraph, sitemap)

### Backend
- **Node.js 20+** + **Express**
- **TypeScript**
- **Prisma** (ORM)
- **PostgreSQL**
- **JWT** authentication (admin only)
- RESTful API

## 📁 Project Structure

```
.
├── frontend/              # Next.js application
│   ├── src/
│   │   ├── app/          # App router pages (11 pages)
│   │   │   ├── admin/    # CMS Admin Dashboard
│   │   │   ├── about/
│   │   │   ├── publications/
│   │   │   └── ...
│   │   ├── components/  # Reusable components
│   │   ├── config/      # Site configuration
│   │   └── lib/         # Utilities
│   └── public/          # Static assets
│
├── backend/              # Node.js API
│   ├── src/
│   │   ├── routes/      # API routes
│   │   ├── middleware/  # Auth & error handling
│   │   ├── lib/         # Utilities (JWT, Prisma)
│   │   └── prisma/      # Database seed
│   └── prisma/          # Prisma schema
│
└── docker-compose.yml   # Docker setup (optional)
```

## 🛠️ Local Development

### Prerequisites

- **Node.js 20+**
- **PostgreSQL 16+** (or use Docker)
- **npm** or **yarn**

### Step 1: Clone & Install

```bash
# Clone the repository
git clone <your-repo-url>
cd Vijay_nagar

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 2: Database Setup

#### Option A: Local PostgreSQL

1. Create a database:
```bash
createdb vijay_nagar_db
```

2. Update `backend/.env`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/vijay_nagar_db?schema=public"
```

#### Option B: Docker (Recommended)

```bash
# From project root
docker-compose up -d
```

This starts PostgreSQL on `localhost:5432` with:
- Database: `vijay_nagar_db`
- User: `postgres`
- Password: `postgres`

### Step 3: Backend Configuration

1. Copy environment file:
```bash
cd backend
cp .env.example .env
```

2. Generate a secure JWT secret:
```bash
npm run generate:jwt-secret
# Copy the generated secret
```

3. Edit `backend/.env`:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/vijay_nagar_db?schema=public"
JWT_SECRET="<paste-generated-secret-here>"
JWT_EXPIRES_IN="never"
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=changeme123
```

4. Setup database:
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed database (creates admin user)
npm run seed
```

5. Start backend:
```bash
npm run dev
```

Backend runs on `http://localhost:3001`

### Step 4: Frontend Configuration

#### Option A: Local Frontend + Local Backend (Default)

1. Create `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

2. Start frontend:
```bash
cd frontend
npm run dev
```

Frontend runs on `http://localhost:3000`

#### Option B: Local Frontend + Render Backend (Testing Production Backend)

1. Create `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=https://vijay-nagar-backend.onrender.com/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Important Configuration Steps**:

1. **Create/Edit `frontend/.env.local` file**:
   ```bash
   # Navigate to frontend directory
   cd frontend
   
   # Create .env.local file (if it doesn't exist)
   # On Windows PowerShell:
   New-Item .env.local -ItemType File
   # On Mac/Linux:
   touch .env.local
   ```

2. **Add the environment variables** (open `.env.local` in your editor):
   ```env
   NEXT_PUBLIC_API_URL=https://vijay-nagar-backend.onrender.com/api
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

3. **⚠️ Remove Trailing Slash**:
   - **Correct**: `https://vijay-nagar-backend.onrender.com/api` ✅
   - **Wrong**: `https://vijay-nagar-backend.onrender.com/api/` ❌
   
   **Why?** The trailing slash can cause routing issues. Your API endpoints are:
   - `/api/auth/login` (not `/api//auth/login`)
   - `/api/publications` (not `/api//publications`)
   
   **How to check**: Open `.env.local` and make sure the URL ends with `/api` (no slash after `api`)

4. **Backend CORS Configuration**:
   - The backend code has been updated to allow `http://localhost:3000` for local testing
   - This means your local frontend can connect to the Render backend
   - **You need to redeploy the backend** on Render for this to work (see below)

5. **Redeploy Backend on Render** (one-time setup):
   - The backend CORS code allows localhost connections
   - Go to Render dashboard → Your backend service
   - Click **Manual Deploy** → **Deploy latest commit**
   - Or push your code changes to GitHub (auto-deploy)
   - Wait for deployment to complete (~2-3 minutes)

6. **Verify `.env.local` is correct**:
   ```bash
   # Check the file contents
   cat .env.local  # Mac/Linux
   type .env.local  # Windows PowerShell
   Get-Content .env.local  # Windows PowerShell (alternative)
   ```
   
   Should show:
   ```
   NEXT_PUBLIC_API_URL=https://vijay-nagar-backend.onrender.com/api
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```
   
   **Verify no trailing slash**: The API URL should end with `/api` (not `/api/`)

7. **Start frontend**:
   ```bash
   npm run dev
   ```
   
   You should see:
   ```
   ▲ Next.js 16.x.x
   - Local:        http://localhost:3000
   - Ready in X seconds
   ```

8. **Access admin dashboard**:
   - Open browser: `http://localhost:3000/admin`
   - Use credentials from your Render backend:
     - Email: Check `ADMIN_EMAIL` in Render dashboard
     - Password: Check `ADMIN_PASSWORD` in Render dashboard

9. **Test the connection**:
   - Open browser DevTools (F12) → Console tab
   - Look for any errors
   - If you see "Cannot reach API", wait 10-15 seconds and refresh
   - Render free tier services sleep after 15 minutes and need time to wake up

**Troubleshooting**:
- **If you see CORS errors**: Make sure backend is redeployed with the updated CORS code
- **If API URL not found**: Check `.env.local` has no trailing slash
- **If connection timeout**: Wait 10-15 seconds (Render service waking up)
- **If still not working**: Check browser console for specific error messages

### Step 5: Access the Application

- **Website**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin
  - Email: `admin@example.com`
  - Password: `changeme123` (from seed)

## 📦 Deployment

### Recommended: Render (Backend) + Vercel (Frontend)

### Part 1: Deploy Backend to Render

1. **Create PostgreSQL Database**:
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click **New +** → **PostgreSQL**
   - Name: `vijay-nagar-db`
   - Plan: `Free` (or `Starter` for production)
   - Click **Create Database**
   - Copy the **Internal Database URL**

2. **Create Backend Web Service**:
   - Click **New +** → **Web Service**
   - Connect your GitHub repository
   - Configure:
     - **Name**: `vijay-nagar-backend`
     - **Root Directory**: `backend`
     - **Environment**: `Node`
     - **Build Command**: `npm ci && npm run build && npx prisma generate`
     - **Start Command**: `npm start`
     - **Plan**: `Free` (or `Starter` for production)

3. **Set Environment Variables**:
   ```
   DATABASE_URL=<from-postgres-service-internal-url>
   JWT_SECRET=<generate-using-npm-run-generate:jwt-secret>
   JWT_EXPIRES_IN=never
   PORT=10000
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend.vercel.app
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=<set-strong-password>
   ```

4. **Deploy**:
   - Click **Create Web Service**
   - Wait for build to complete
   - Note the service URL: `https://your-backend.onrender.com`
   - **Test**: Visit the root URL to see API information
   - **Health Check**: `https://your-backend.onrender.com/api/health`

5. **Run Database Migrations**:
   - After first deploy, go to **Shell** tab
   - Run: `npm run db:migrate:deploy`

6. **Setup Admin User** (Choose one method):
   
   **Method A: Web UI (Recommended)**:
   - Visit: `https://your-frontend.vercel.app/admin/setup`
   - Fill in email and password
   - Click "Create Admin User"
   
   **Method B: Command Line**:
   - Go to **Shell** tab
   - Run: `npm run admin:setup` (uses env vars)
   - Or: `npm run admin:create -- --email admin@example.com --password YourPassword123`
   
   **Method C: API Endpoint**:
   - POST to `/api/admin/setup` with email and password
   - Only works if no admin exists

### Part 2: Deploy Frontend to Vercel

1. **Connect Repository**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click **Add New Project**
   - Import your GitHub repository

2. **Configure Project**:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

3. **Set Environment Variables**:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
   NEXT_PUBLIC_SITE_URL=https://your-frontend.vercel.app
   ```

4. **Deploy**:
   - Click **Deploy**
   - Wait for build to complete
   - Your site is live!

5. **Update Backend CORS**:
   - Go back to Render backend service
   - Update `FRONTEND_URL` to your Vercel URL
   - Redeploy backend

### Alternative: Deploy Both to Render

If you prefer Render for both:

1. **Frontend as Web Service** (not Static Site):
   - **Important**: Must be Web Service for admin dashboard to work
   - Follow same steps as backend
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Environment Variables:
     ```
     NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
     NEXT_PUBLIC_SITE_URL=https://your-frontend.onrender.com
     ```

2. **Update Backend CORS**:
   - Set `FRONTEND_URL` to your Render frontend URL

### Using Render Blueprint (One-Click Deploy)

1. Push `render.yaml` to your repository
2. Go to Render Dashboard → **New +** → **Blueprint**
3. Connect repository
4. Render will create all services automatically
5. Update environment variables as needed

## 🔐 Admin Dashboard

### Access

- **Local**: http://localhost:3000/admin
- **Production**: https://your-domain.com/admin

### Login

- Email: Set in `ADMIN_EMAIL` environment variable
- Password: Set in `ADMIN_PASSWORD` environment variable
- Default (from seed): `admin@example.com` / `changeme123`

### Features

- **Web-based CMS**: Manage content through beautiful UI
- **Publications**: Create, edit, delete publications
- **Projects**: Manage industry and academic projects
- **Experience**: Add work experience entries
- **Achievements**: Manage awards and achievements
- **Teaching**: Add teaching and service entries

### API Endpoints

All endpoints require authentication (except public GET):

```
POST   /api/auth/login          # Login
GET    /api/auth/me              # Get current user
POST   /api/auth/change-password # Change password

GET    /api/publications        # List publications (public)
POST   /api/publications        # Create (admin)
PUT    /api/publications/:id    # Update (admin)
DELETE /api/publications/:id    # Delete (admin)

GET    /api/projects/industry    # List industry projects (public)
POST   /api/projects/industry    # Create (admin)
PUT    /api/projects/industry/:id # Update (admin)
DELETE /api/projects/industry/:id # Delete (admin)

GET    /api/projects/academic    # List academic projects (public)
POST   /api/projects/academic    # Create (admin)
PUT    /api/projects/academic/:id # Update (admin)
DELETE /api/projects/academic/:id # Delete (admin)

GET    /api/experience          # List experience (public)
POST   /api/experience          # Create (admin)
PUT    /api/experience/:id      # Update (admin)
DELETE /api/experience/:id      # Delete (admin)

GET    /api/achievements        # List achievements (public)
POST   /api/achievements        # Create (admin)
PUT    /api/achievements/:id    # Update (admin)
DELETE /api/achievements/:id    # Delete (admin)

GET    /api/teaching            # List teaching/service (public)
POST   /api/teaching            # Create (admin)
PUT    /api/teaching/:id        # Update (admin)
DELETE /api/teaching/:id        # Delete (admin)
```

## 🐛 Troubleshooting

### Network Error in Admin Dashboard

**Problem**: "Cannot reach API" or "Network error. Please check your connection."

**⚠️ Most Common Cause: Render Free Tier Service Sleeping**

Render free tier services automatically sleep after 15 minutes of inactivity. This is the #1 cause of "Cannot reach API" errors.

**Quick Fix**:
1. **Wait 10-15 seconds** after the first request (service needs to wake up)
2. **Refresh the page** - the second request should work
3. **Test backend first**: Visit `https://vijay-nagar-backend.onrender.com/api/health` in your browser
4. **Upgrade to paid plan** if you need always-on service (no sleeping)

**Common Causes & Solutions**:

1. **Backend Service Sleeping (Render Free Tier)**:
   - **Issue**: Render free tier services sleep after 15 minutes of inactivity
   - **Solution**: 
     - Wait 10-15 seconds after first request (service needs to wake up)
     - Or upgrade to paid plan for always-on service
     - Test: Visit `https://your-backend.onrender.com/api/health` in browser first

2. **Environment Variables Not Set**:
   - **Frontend**: `NEXT_PUBLIC_API_URL` must be set to `https://your-backend.onrender.com/api`
   - **Backend**: `FRONTEND_URL` must match frontend URL exactly (e.g., `https://your-frontend.vercel.app`)
   - **Action**: Set in Vercel/Render dashboard → Environment Variables → Redeploy

3. **CORS Misconfiguration**:
   - **Backend `FRONTEND_URL`** must:
     - Include `https://` (not `http://`)
     - Match frontend URL exactly
     - No trailing slash
     - Example: `https://your-frontend.vercel.app` (not `https://your-frontend.vercel.app/`)
   - **Action**: Update in Render backend service → Environment Variables → Redeploy

4. **Backend Not Running**:
   - **Test**: Visit `https://your-backend.onrender.com` in browser
   - **Should see**: API information JSON
   - **If error**: Check Render dashboard → Logs tab for errors

5. **Frontend Deployment Type**:
   - Must be **Web Service** (not Static Site) on Render
   - Required for admin dashboard to work
   - Vercel: Always works (no configuration needed)

6. **Network/Timeout Issues**:
   - First request to sleeping service may timeout
   - **Solution**: Refresh page after 10-15 seconds
   - Check browser console for detailed error messages

### Database Connection Error

**Problem**: Backend can't connect to database

**Solutions**:

1. **Check DATABASE_URL**:
   - Format: `postgresql://user:password@host:port/database?schema=public`
   - Use **Internal Database URL** on Render (not External)

2. **Run Migrations**:
   ```bash
   npm run db:migrate:deploy
   ```

3. **Verify Database is Running**:
   - Check Render dashboard
   - Database service should be "Available"

### Build Errors

**Problem**: TypeScript or build errors

**Solutions**:

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Generate Prisma Client**:
   ```bash
   npm run db:generate
   ```

3. **Check Node Version**:
   - Must be Node.js 20+
   - Check: `node --version`

### Admin Login Not Working

**Problem**: Can't login to admin dashboard

**Solutions**:

1. **Verify Admin User Exists**:
   ```bash
   npm run seed
   ```

2. **Check Credentials**:
   - Email: From `ADMIN_EMAIL` env var
   - Password: From `ADMIN_PASSWORD` env var

3. **Reset Password**:
   - Use API: `POST /api/auth/change-password`
   - Or delete user and run seed again

## 📝 Environment Variables Reference

### Backend (.env)

```env
# Database
DATABASE_URL=postgresql://user:password@host:port/database?schema=public

# JWT
JWT_SECRET=<64+ character hex string>
JWT_EXPIRES_IN=never  # or "7d", "30d", etc.

# Server
PORT=3001
NODE_ENV=development  # or "production"

# CORS
FRONTEND_URL=http://localhost:3000  # or production URL

# Admin (for seed)
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=changeme123
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🎨 Website Pages

The portfolio includes 11 pages:

1. **Home** (`/`) - Hero, intro, quick links
2. **About** (`/about`) - Personal background
3. **Publications** (`/publications`) - Research papers
4. **Industry Projects** (`/industry-projects`) - Work projects
5. **Academic Projects** (`/academic-projects`) - Research projects
6. **Experience** (`/experience`) - Work history
7. **Skills** (`/skills`) - Technical skills
8. **Achievements** (`/achievements`) - Awards & recognition
9. **Teaching** (`/teaching`) - Teaching & service
10. **Research Interests** (`/research-interests`) - Research areas
11. **Contact** (`/contact`) - Contact information

## 🛠️ Development Scripts

### Backend

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Start production server
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema to database
npm run db:migrate       # Create migration
npm run db:migrate:deploy # Deploy migrations (production)
npm run db:studio        # Open Prisma Studio
npm run seed             # Seed database
npm run generate:jwt-secret # Generate JWT secret
```

### Frontend

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Start production server
npm run lint             # Run ESLint
```

## 📚 Additional Resources

- **Prisma Docs**: https://www.prisma.io/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs

## 📄 License

MIT

## 👤 Author

Vijay Nagar - Computer Vision Engineer & Applied AI Researcher

---

**Need Help?** Check the troubleshooting section or open an issue on GitHub.
