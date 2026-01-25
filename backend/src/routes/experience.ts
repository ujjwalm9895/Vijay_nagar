import express from 'express';
import { body, validationResult } from 'express-validator';
import { prisma } from '../lib/prisma';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { order: 'asc' },
    });
    res.json(experiences);
  } catch (error) {
    console.error('Get experience error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const experience = await prisma.experience.findUnique({
      where: { id: req.params.id },
    });
    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }
    res.json(experience);
  } catch (error) {
    console.error('Get experience error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post(
  '/',
  authenticate,
  requireAdmin,
  [body('title').notEmpty(), body('company').notEmpty(), body('startDate').notEmpty()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const experience = await prisma.experience.create({ data: req.body });
      res.status(201).json(experience);
    } catch (error) {
      console.error('Create experience error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

router.put('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const experience = await prisma.experience.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(experience);
  } catch (error) {
    console.error('Update experience error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    await prisma.experience.delete({ where: { id: req.params.id } });
    res.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    console.error('Delete experience error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
