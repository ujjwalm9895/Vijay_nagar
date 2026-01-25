import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { prisma } from '../lib/prisma';
import { authenticate, requireAdmin, AuthRequest } from '../middleware/auth';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const achievements = await prisma.achievement.findMany({
      orderBy: { order: 'asc' },
    });
    res.json(achievements);
  } catch (error) {
    console.error('Get achievements error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const achievement = await prisma.achievement.findUnique({
      where: { id: req.params.id },
    });
    if (!achievement) {
      return res.status(404).json({ error: 'Achievement not found' });
    }
    res.json(achievement);
  } catch (error) {
    console.error('Get achievement error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post(
  '/',
  authenticate,
  requireAdmin,
  [body('title').notEmpty()],
  async (req: AuthRequest, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const achievement = await prisma.achievement.create({ data: req.body });
      res.status(201).json(achievement);
    } catch (error) {
      console.error('Create achievement error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

router.put('/:id', authenticate, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const achievement = await prisma.achievement.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(achievement);
  } catch (error) {
    console.error('Update achievement error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', authenticate, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    await prisma.achievement.delete({ where: { id: req.params.id } });
    res.json({ message: 'Achievement deleted successfully' });
  } catch (error) {
    console.error('Delete achievement error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
