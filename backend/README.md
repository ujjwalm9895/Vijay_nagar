# Backend API

Node.js/Express backend with TypeScript, Prisma, and PostgreSQL.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
```bash
cp .env.example .env
# Edit .env with your settings
```

3. Set up database:
```bash
npm run db:generate
npm run db:migrate
npm run seed  # Optional
```

4. Start development server:
```bash
npm run dev
```

## API Endpoints

### Public
- `GET /api/health` - Health check
- `GET /api/publications` - List publications
- `GET /api/projects/industry` - Industry projects
- `GET /api/projects/academic` - Academic projects
- `GET /api/experience` - Experience
- `GET /api/achievements` - Achievements
- `GET /api/teaching` - Teaching & service

### Admin (JWT required)
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Current user
- `POST /api/auth/change-password` - Change password
- CRUD endpoints for all resources

## Database Schema

See `prisma/schema.prisma` for full schema.

## Development

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run db:studio    # Open Prisma Studio
```
