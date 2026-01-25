# Quick Start Guide

Get your portfolio up and running in 5 minutes!

## 🚀 Deploy to Render (Production)

**Fastest way - Use Blueprint:**
1. Push code to GitHub
2. Render Dashboard → **New +** → **Blueprint**
3. Connect repository
4. Deploy!

See [RENDER_QUICKSTART.md](RENDER_QUICKSTART.md) for detailed steps.

## 💻 Local Development

### Option 1: Docker (Recommended for local)

```bash
# Start everything
docker-compose up -d

# Initialize database
docker-compose exec backend npm run db:generate
docker-compose exec backend npm run db:migrate
docker-compose exec backend npm run seed

# Access:
# Frontend: http://localhost:3000
# Backend: http://localhost:3001
```

## 📝 Manual Setup

### Step 1: Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env - set DATABASE_URL to your PostgreSQL
npm run db:generate
npm run db:migrate
npm run seed
npm run dev
```

### Step 2: Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local - set NEXT_PUBLIC_API_URL=http://localhost:3001/api
npm run dev
```

### Step 3: Access

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001/api

## 🔑 Admin Login

Default credentials (change in `.env`):
- Email: `admin@example.com`
- Password: `changeme123`

Login endpoint: `POST http://localhost:3001/api/auth/login`

## 📚 Next Steps

1. Customize content in frontend pages
2. Update `frontend/src/config/site.ts` with your links
3. Add your publications/projects via API or seed file
4. Deploy to Render (see RENDER_QUICKSTART.md or RENDER_DEPLOYMENT.md)

## 🐛 Troubleshooting

**Database connection error?**
- Make sure PostgreSQL is running
- Check `DATABASE_URL` in backend `.env`

**CORS errors?**
- Verify `FRONTEND_URL` in backend `.env`
- Check `NEXT_PUBLIC_API_URL` in frontend `.env.local`

**Port already in use?**
- Change `PORT` in backend `.env`
- Update frontend API URL accordingly

## 📖 Full Documentation

- [README.md](README.md) - Complete documentation
- [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md) - Complete Render deployment guide
- [RENDER_QUICKSTART.md](RENDER_QUICKSTART.md) - Quick Render deployment
- [backend/README.md](backend/README.md) - Backend API docs
