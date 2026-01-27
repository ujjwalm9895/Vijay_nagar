import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import { validateJWTEnv } from './lib/jwt';
import authRoutes from './routes/auth';
import adminRoutes from './routes/admin';
import publicationRoutes from './routes/publications';
import projectRoutes from './routes/projects';
import experienceRoutes from './routes/experience';
import achievementRoutes from './routes/achievements';
import teachingRoutes from './routes/teaching';

dotenv.config();

// Validate JWT environment variables at startup
try {
  validateJWTEnv();
} catch (error) {
  console.error('JWT Configuration Error:', error instanceof Error ? error.message : 'Unknown error');
  if (process.env.NODE_ENV === 'production') {
    process.exit(1);
  } else {
    console.warn('Continuing in development mode, but JWT may not work correctly.');
  }
}

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
// CORS Configuration - Allow multiple frontend origins
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

// Build list of allowed origins
const allowedOrigins: string[] = [];

// Always allow localhost for local development
allowedOrigins.push('http://localhost:3000');

// Add production frontend URL if set
if (frontendUrl && frontendUrl !== 'http://localhost:3000') {
  allowedOrigins.push(frontendUrl);
}

// Allow common Vercel and Render frontend patterns
// Add any additional frontend URLs from environment variable (comma-separated)
if (process.env.ALLOWED_ORIGINS) {
  const additionalOrigins = process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim());
  allowedOrigins.push(...additionalOrigins);
}

// In development, be more permissive
if (process.env.NODE_ENV === 'development') {
  // Allow common localhost ports
  allowedOrigins.push(
    'http://localhost:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001'
  );
}

// Remove duplicates
const uniqueOrigins = [...new Set(allowedOrigins)];

console.log('🌐 CORS Allowed Origins:', uniqueOrigins);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, Postman, etc.)
    if (!origin) {
      return callback(null, true);
    }
    
    // Check if origin is in allowed list
    if (uniqueOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // Log blocked origin for debugging
      console.warn('⚠️ CORS blocked origin:', origin);
      console.warn('   Allowed origins:', uniqueOrigins);
      callback(new Error(`Not allowed by CORS. Origin: ${origin}`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers'
  ],
  exposedHeaders: ['Content-Length', 'Content-Type'],
  maxAge: 86400, // 24 hours - cache preflight requests
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route - API information
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Vijay Nagar Portfolio API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      publications: '/api/publications',
      projects: '/api/projects',
      experience: '/api/experience',
      achievements: '/api/achievements',
      teaching: '/api/teaching',
    },
    documentation: 'See README.md for API documentation',
  });
});

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/publications', publicationRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/teaching', teachingRoutes);

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
});
