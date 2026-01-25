# Backend API

Node.js/Express backend with TypeScript, Prisma, and PostgreSQL.

## 🏗️ Architecture

- **Type-Safe JWT System**: Centralized JWT utilities in `src/lib/jwt.ts`
- **Environment Validation**: JWT configuration validated at startup
- **Strict TypeScript**: Full type safety with `strict: true` and `noImplicitAny`
- **Reusable Utilities**: Clean separation of concerns

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

**Generate a secure JWT secret:**
```bash
npm run generate:jwt-secret
# Copy the generated secret to your .env file
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

## 🔐 JWT Configuration

### Environment Variables

- `JWT_SECRET` (required): Secret key for signing tokens
  - **Generate securely**: `npm run generate:jwt-secret`
  - **Minimum length**: 32 characters (64+ recommended)
  - **Security**: Must be cryptographically random
  - The system validates secret strength at startup
- `JWT_EXPIRES_IN` (optional): Token expiration
  - `never` or unset: Token never expires
  - `7d`, `24h`, `3600s`: Time string format
  - `3600`: Number (seconds)

### JWT Utilities

Located in `src/lib/jwt.ts`:

- `generateToken(payload, config?)` - Generate JWT tokens
- `verifyToken(token, config?)` - Verify and decode tokens
- `getJWTConfig()` - Get validated JWT configuration
- `validateJWTEnv()` - Validate environment variables

**Example:**
```typescript
import { generateToken, verifyToken } from './lib/jwt';

// Generate token
const token = generateToken({
  id: 'user-id',
  email: 'user@example.com',
  role: 'admin'
});

// Verify token
const payload = verifyToken(token);
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
- `POST /api/auth/login` - Login (returns JWT token)
- `GET /api/auth/me` - Current user
- `POST /api/auth/change-password` - Change password
- CRUD endpoints for all resources

**Authentication:**
```
Authorization: Bearer <jwt-token>
```

## Database Schema

See `prisma/schema.prisma` for full schema.

## Development

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run db:studio    # Open Prisma Studio
```

## Type Safety

- All route handlers are fully typed
- JWT utilities use type guards (no unsafe assertions)
- Environment variables validated at startup
- Compatible with `strict: true` and `noImplicitAny`
