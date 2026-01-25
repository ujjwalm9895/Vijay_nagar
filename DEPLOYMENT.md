# Deployment Guide

## Quick Start

### Prerequisites
- Node.js 20+
- PostgreSQL 16+
- Docker (optional)

## Local Development

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run db:generate
npm run db:migrate
npm run seed  # Optional: seed with sample data
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with API URL
npm run dev
```

## Docker Deployment

### Using Docker Compose

```bash
docker-compose up -d
```

This will start:
- PostgreSQL database on port 5432
- Backend API on port 3001
- Frontend on port 3000

### Initialize Database

```bash
docker-compose exec backend npm run db:generate
docker-compose exec backend npm run db:migrate
docker-compose exec backend npm run seed
```

## Production Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables:
   - `NEXT_PUBLIC_API_URL` - Your backend API URL
   - `NEXT_PUBLIC_SITE_URL` - Your frontend URL
4. Deploy

### Backend (cPanel/VPS)

1. **Build the application:**
```bash
cd backend
npm install
npm run build
```

2. **Set up PostgreSQL:**
   - Create database and user
   - Update `DATABASE_URL` in `.env`

3. **Run migrations:**
```bash
npm run db:migrate
```

4. **Start with PM2:**
```bash
npm install -g pm2
pm2 start dist/server.js --name vijay-nagar-api
pm2 save
pm2 startup
```

5. **Set up reverse proxy (Nginx):**
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Environment Variables

#### Backend (.env)
```env
DATABASE_URL=postgresql://user:password@host:port/dbname
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=strong-password-here
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Database Migrations

### Create a new migration:
```bash
npm run db:migrate -- --name migration_name
```

### Apply migrations:
```bash
npm run db:migrate
```

### Reset database (development only):
```bash
npm run db:push -- --force-reset
```

## Admin Access

1. Login at `POST /api/auth/login`:
```json
{
  "email": "admin@example.com",
  "password": "your-password"
}
```

2. Use the JWT token in subsequent requests:
```
Authorization: Bearer <token>
```

## Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running
- Check `DATABASE_URL` format
- Ensure database exists

### CORS Errors
- Update `FRONTEND_URL` in backend `.env`
- Check API URL in frontend `.env.local`

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

## Security Checklist

- [ ] Change default admin credentials
- [ ] Use strong `JWT_SECRET`
- [ ] Enable HTTPS
- [ ] Set `NODE_ENV=production`
- [ ] Configure CORS properly
- [ ] Use environment variables (never commit secrets)
- [ ] Set up database backups
- [ ] Configure rate limiting (optional)
