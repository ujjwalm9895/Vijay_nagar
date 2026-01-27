import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { prisma } from '../lib/prisma';
import { authenticate, requireAdmin, AuthRequest } from '../middleware/auth';
import bcrypt from 'bcryptjs';
import { setupAdmin } from '../admin/setup';

const router = express.Router();

/**
 * POST /api/admin/setup
 * Initialize admin user (first-time setup only)
 * This endpoint can only be called if no admin exists
 */
router.post(
  '/setup',
  [
    body('email').isEmail().withMessage('Valid email required'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters'),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Check if any admin exists
      const existingAdmin = await prisma.user.findFirst({
        where: { role: 'admin' },
      });

      if (existingAdmin) {
        return res.status(403).json({
          error: 'Admin user already exists. Use /api/admin/reset-password to change password.',
        });
      }

      // Create admin
      const { email, password } = req.body;
      const result = await setupAdmin({ email, password, force: true });

      if (result.success) {
        res.status(201).json({
          message: 'Admin user created successfully',
          user: result.user,
        });
      } else {
        res.status(500).json({ error: result.message });
      }
    } catch (error) {
      console.error('Admin setup error:', error);
      res.status(500).json({ error: 'Failed to create admin user' });
    }
  }
);

/**
 * POST /api/admin/reset-password
 * Reset admin password (requires authentication)
 */
router.post(
  '/reset-password',
  authenticate,
  requireAdmin,
  [
    body('newPassword')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters'),
  ],
  async (req: AuthRequest, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { newPassword } = req.body;
      const userId = req.user!.id;

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update password
      await prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      });

      res.json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error('Password reset error:', error);
      res.status(500).json({ error: 'Failed to update password' });
    }
  }
);

/**
 * GET /api/admin/status
 * Check if admin user exists (public endpoint for setup check)
 */
router.get('/status', async (req: Request, res: Response) => {
  try {
    const adminCount = await prisma.user.count({
      where: { role: 'admin' },
    });

    res.json({
      adminExists: adminCount > 0,
      adminCount,
      setupRequired: adminCount === 0,
    });
  } catch (error) {
    console.error('Admin status error:', error);
    res.status(500).json({ error: 'Failed to check admin status' });
  }
});

/**
 * GET /api/admin/info
 * Get admin user info (requires authentication)
 */
router.get('/info', authenticate, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Admin info error:', error);
    res.status(500).json({ error: 'Failed to get admin info' });
  }
});

export default router;
