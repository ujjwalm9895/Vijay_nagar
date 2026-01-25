import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import { validateJWTEnv } from './lib/jwt';
import authRoutes from './routes/auth';
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
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
app.use(cors({
  origin: frontendUrl,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);
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
