# Vijay Nagar - Portfolio Website

A modern, production-ready personal portfolio website for a Computer Vision Engineer & Applied AI Researcher.

## 🚀 Tech Stack

### Frontend
- **Next.js 14+** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **Radix UI** components
- **next-themes** (dark mode)
- Responsive (mobile-first)
- SEO optimized (metadata, OpenGraph, sitemap)

### Backend
- **Node.js** + **Express**
- **TypeScript**
- **Prisma** (ORM)
- **PostgreSQL**
- **JWT** authentication (admin only)
- RESTful API

## 📁 Project Structure

```
.
├── frontend/          # Next.js application
│   ├── src/
│   │   ├── app/      # App router pages
│   │   ├── components/ # Reusable components
│   │   ├── config/   # Configuration
│   │   └── lib/      # Utilities
│   └── public/       # Static assets
│
├── backend/          # Node.js API
│   ├── src/
│   │   ├── routes/   # API routes
│   │   ├── middleware/ # Auth & error handling
│   │   ├── lib/      # Prisma client
│   │   └── prisma/   # Database seed
│   └── prisma/       # Prisma schema
│
└── docker-compose.yml # Docker setup
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 20+
- PostgreSQL 16+
- Docker & Docker Compose (optional)

### Option 1: Local Development

#### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/vijay_nagar_db?schema=public"
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=changeme123
```

4. Set up database:
```bash
# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed database (optional)
npm run seed
```

5. Start development server:
```bash
npm run dev
```

Backend will run on `http://localhost:3001`

#### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. Start development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

### Option 2: Docker Setup

1. Start all services:
```bash
docker-compose up -d
```

2. Initialize database:
```bash
# Generate Prisma client and run migrations
docker-compose exec backend npm run db:generate
docker-compose exec backend npm run db:migrate
docker-compose exec backend npm run seed
```

3. Access:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:3001`
   - Database: `localhost:5432`

## 📚 API Endpoints

### Public Endpoints

- `GET /api/health` - Health check
- `GET /api/publications` - Get all publications
- `GET /api/publications/:id` - Get single publication
- `GET /api/projects/industry` - Get industry projects
- `GET /api/projects/academic` - Get academic projects
- `GET /api/experience` - Get experience
- `GET /api/achievements` - Get achievements
- `GET /api/teaching` - Get teaching & service

### Admin Endpoints (JWT required)

- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/change-password` - Change password
- `POST /api/publications` - Create publication
- `PUT /api/publications/:id` - Update publication
- `DELETE /api/publications/:id` - Delete publication
- Similar CRUD endpoints for projects, experience, achievements, teaching

## 🔐 Admin Authentication

1. Login at `POST /api/auth/login`:
```json
{
  "email": "admin@example.com",
  "password": "changeme123"
}
```

2. Use the returned JWT token in subsequent requests:
```
Authorization: Bearer <token>
```

## 🎨 Features

- ✅ Modern, clean design inspired by research labs
- ✅ Dark mode support
- ✅ Responsive (mobile-first)
- ✅ Smooth animations (Framer Motion)
- ✅ SEO optimized (metadata, sitemap, robots.txt)
- ✅ CMS-ready backend API
- ✅ JWT authentication for admin
- ✅ Type-safe (TypeScript)
- ✅ Production-ready Docker setup

## 📄 Pages

1. **Home** - Hero section with introduction
2. **About** - Background and interests
3. **Research Interests** - Research areas
4. **Publications** - Research papers
5. **Industry Projects** - Professional projects
6. **Academic Projects** - Academic work
7. **Experience** - Work history
8. **Skills** - Technical skills
9. **Achievements** - Awards and recognitions
10. **Teaching & Service** - Academic contributions
11. **Contact** - Contact information

## 🚀 Quick Deploy to Render

1. **Push code to GitHub**

2. **Option A: Use Blueprint (Recommended)**
   - Go to Render Dashboard → **New +** → **Blueprint**
   - Connect your GitHub repository
   - Render will detect `render.yaml` and deploy all services

3. **Option B: Manual Setup**
   - Follow step-by-step guide in [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md)

4. **After deployment:**
   - Run migrations in backend Shell: `npx prisma migrate deploy`
   - Seed database (optional): `npm run seed`
   - Update `FRONTEND_URL` in backend environment variables

## 🚢 Deployment

### Recommended: Render.com

**Quick Deploy on Render:**

1. **Set up PostgreSQL Database:**
   - Render Dashboard → New + → PostgreSQL
   - Save the connection string

2. **Deploy Backend:**
   - New + → Web Service
   - Root Directory: `backend`
   - Build Command: `npm install && npm run build && npx prisma generate`
   - Start Command: `npm start`
   - Add environment variables (see RENDER_DEPLOYMENT.md)

3. **Deploy Frontend:**
   - New + → Static Site
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `.next`
   - Add environment variables

**Full guide:** See [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md)

### Alternative: Vercel (Frontend) + Render (Backend)

**Frontend on Vercel:**
1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

**Backend on Render:**
- Follow Render deployment steps above

### Alternative: Self-Hosted (VPS)

1. Build the application:
```bash
npm run build
```

2. Set up PostgreSQL database
3. Configure environment variables
4. Run migrations:
```bash
npm run db:migrate
```

5. Start production server:
```bash
npm start
```

Or use PM2:
```bash
pm2 start dist/server.js --name vijay-nagar-api
```

### Docker Deployment

Build and push images:
```bash
docker-compose build
docker-compose up -d
```

## 🔧 Development

### Backend Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run database migrations
npm run db:push      # Push schema changes
npm run db:studio    # Open Prisma Studio
npm run seed         # Seed database
```

### Frontend Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 📝 Environment Variables

### Backend (.env for local development)

```env
DATABASE_URL=postgresql://user:password@host:port/dbname
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=changeme123
```

### Frontend (.env.local for local development)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Render Deployment

For Render deployment, see [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md) for complete environment variable setup.

**Quick Reference:**
- Backend needs: `DATABASE_URL`, `JWT_SECRET`, `FRONTEND_URL`, etc.
- Frontend needs: `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SITE_URL`

## 🤝 Contributing

This is a personal portfolio project. For suggestions or improvements, please open an issue.

## 📄 License

MIT License

## 👤 Author

**Vijay Nagar**
- Email: jvjnagar@gmail.com
- LinkedIn: [LinkedIn Profile]
- GitHub: [GitHub Profile]

---

Built with ❤️ using Next.js and Node.js
