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
│   │   ├── lib/      # Utilities (JWT, Prisma)
│   │   │   ├── jwt.ts      # Type-safe JWT utilities
│   │   │   └── prisma.ts   # Prisma client
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

### Architecture Highlights

- **Type-Safe JWT System**: Fully type-safe JWT token generation and verification with runtime validation
- **Environment Validation**: JWT configuration validated at application startup
- **Reusable Utilities**: Centralized JWT logic in `backend/src/lib/jwt.ts`
- **Strict TypeScript**: Compatible with `strict: true` and `noImplicitAny`

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

**Generate a secure JWT secret (recommended):**
```bash
npm run generate:jwt-secret
# Copy the generated secret to your .env file
```

Edit `.env` with your configuration:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/vijay_nagar_db?schema=public"
JWT_SECRET="<generated-secret-from-above-command>"
JWT_EXPIRES_IN="never"
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=changeme123
```

**Note:** The `.env.example` file includes a secure example JWT secret (128 characters). For production, always generate a new unique secret using `npm run generate:jwt-secret`.

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

### Login

1. Login at `POST /api/auth/login`:
```json
{
  "email": "admin@example.com",
  "password": "changeme123"
}
```

2. Response includes JWT token:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user-id",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

3. Use the JWT token in subsequent requests:
```
Authorization: Bearer <token>
```

### Token Expiration

- **No Expiration**: Set `JWT_EXPIRES_IN=never` or leave it unset
- **With Expiration**: Set `JWT_EXPIRES_IN=7d` (or `24h`, `3600s`, etc.)
- Tokens are validated at startup - invalid configuration will fail in production

### JWT Utility Functions

The JWT system uses a centralized utility module (`backend/src/lib/jwt.ts`):

- `generateToken(payload, config?)` - Generate JWT tokens
- `verifyToken(token, config?)` - Verify and decode tokens
- `getJWTConfig()` - Get validated JWT configuration
- `validateJWTEnv()` - Validate environment variables at startup

All functions are fully type-safe and compatible with strict TypeScript settings.

## 🎨 Features

- ✅ Modern, clean design inspired by research labs
- ✅ Dark mode support
- ✅ Responsive (mobile-first)
- ✅ Smooth animations (Framer Motion)
- ✅ SEO optimized (metadata, sitemap, robots.txt)
- ✅ CMS-ready backend API
- ✅ **Type-safe JWT authentication** with runtime validation
- ✅ **Environment variable validation** at startup
- ✅ **Reusable JWT utilities** with proper error handling
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

## 📖 Using the CMS & Website

### 🎨 Admin Dashboard UI (Recommended)

**Access the Admin Dashboard**: Navigate to `/admin` on your website
- **Local**: `http://localhost:3000/admin`
- **Production**: `https://your-domain.com/admin`

**Features:**
- ✅ Beautiful, intuitive web interface
- ✅ Login with email/password
- ✅ Manage publications (Create, Read, Update, Delete)
- ✅ Tabbed interface for different content types
- ✅ Responsive design with dark mode support
- ✅ Real-time updates
- ✅ No coding required - point and click interface

**Quick Start:**
1. Visit `/admin` on your website
2. Login with your admin credentials
3. Start managing content through the UI!

### 📚 API Access (For Developers)

**📚 Complete CMS Usage Guide**: [CMS_USAGE.md](CMS_USAGE.md)
- Admin authentication and login
- Managing content (publications, projects, experience, etc.)
- API endpoints and examples
- Code examples (JavaScript, Python, curl)
- Common workflows
- Security best practices

**⚡ Quick Reference**: [CMS_QUICK_REFERENCE.md](CMS_QUICK_REFERENCE.md)
- Quick commands for common operations
- One-liner examples
- Endpoint reference table

### Quick Start (API)

1. **Login to CMS:**
   ```bash
   curl -X POST http://localhost:3001/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email": "admin@example.com", "password": "changeme123"}'
   ```

2. **Use the token** in subsequent requests:
   ```
   Authorization: Bearer <your-token>
   ```

3. **Manage content** using the API endpoints (see guides above)

## 🚀 Quick Deploy

### Option 1: Vercel + Render (Recommended)

1. **Backend on Render:**
   - Create PostgreSQL database
   - Deploy Web Service (root: `backend`)
   - Set environment variables

2. **Frontend on Vercel:**
   - Import GitHub repo
   - Set root directory: `frontend`
   - Add environment variables

3. **Connect them:**
   - Update `FRONTEND_URL` in Render with Vercel URL
   - Update `NEXT_PUBLIC_API_URL` in Vercel with Render URL

**Full guide:** [VERCEL_RENDER_DEPLOYMENT.md](VERCEL_RENDER_DEPLOYMENT.md)

### Option 2: Render Only

1. Use Render Blueprint (detects `render.yaml`)
2. Or follow [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md)

## 🚢 Deployment

### Recommended: Vercel (Frontend) + Render (Backend)

**Best of both worlds:**
- **Vercel**: Optimized Next.js hosting with edge functions and global CDN
- **Render**: Reliable backend with managed PostgreSQL

**Quick Deploy:**

1. **Backend on Render:**
   - Render Dashboard → **New +** → **PostgreSQL** (database)
   - Render Dashboard → **New +** → **Web Service** (backend)
   - Root Directory: `backend`
   - Build: `npm install && npm run build && npx prisma generate`
   - Start: `npm start`

2. **Frontend on Vercel:**
   - Vercel Dashboard → **Add New Project**
   - Import GitHub repository
   - Root Directory: `frontend`
   - Framework: Next.js (auto-detected)

3. **Set Environment Variables:**
   - **Render Backend**: `DATABASE_URL`, `JWT_SECRET`, `FRONTEND_URL` (Vercel URL)
   - **Vercel Frontend**: `NEXT_PUBLIC_API_URL` (Render backend URL)

4. **Initialize Database:**
   - Render Shell: `npx prisma migrate deploy`
   - Optional: `npm run seed`

**Full Guide:** See [VERCEL_RENDER_DEPLOYMENT.md](VERCEL_RENDER_DEPLOYMENT.md)

### Alternative: Render Only

Deploy everything on Render:
- See [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md) for complete guide
- Or use [RENDER_QUICKSTART.md](RENDER_QUICKSTART.md) for quick setup

### Local Development with Docker

For local development only:
```bash
docker-compose up -d
```

**Note:** For production deployment, use Render.com (see above).

## 🔧 Development

### Backend Commands

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run generate:jwt-secret  # Generate secure JWT secret
npm run db:generate      # Generate Prisma client
npm run db:migrate       # Run database migrations
npm run db:push          # Push schema changes
npm run db:studio        # Open Prisma Studio
npm run seed             # Seed database
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
JWT_SECRET=<generate-using-npm-run-generate-jwt-secret>
JWT_EXPIRES_IN=never
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=changeme123
```

**JWT Configuration:**
- `JWT_SECRET` (required): Secret key for signing tokens. 
  - **Generate securely**: `npm run generate:jwt-secret` (in backend directory)
  - **Minimum length**: 32 characters (64+ recommended for production)
  - **Security**: Must be cryptographically random - never use predictable values
  - The `.env.example` file includes a secure example secret
- `JWT_EXPIRES_IN` (optional): Token expiration time. Options:
  - `never` or unset: Token never expires
  - `7d`, `24h`, `3600s`: Time string format
  - `3600`: Number (seconds)
  - Examples: `7d`, `30d`, `24h`, `3600`, `never`

### Frontend (.env.local for local development)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Deployment Environment Variables

**Vercel + Render (Recommended):**
- **Render Backend**: `DATABASE_URL`, `JWT_SECRET`, `FRONTEND_URL` (Vercel URL)
- **Vercel Frontend**: `NEXT_PUBLIC_API_URL` (Render backend URL), `NEXT_PUBLIC_SITE_URL` (Vercel URL)

**Render Only:**
- See [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md) for complete setup

**Full guides:**
- [VERCEL_RENDER_DEPLOYMENT.md](VERCEL_RENDER_DEPLOYMENT.md) - Vercel + Render setup
- [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md) - Render only setup

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
