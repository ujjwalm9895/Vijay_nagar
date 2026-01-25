import express from 'express';
import { body, validationResult } from 'express-validator';
import { prisma } from '../lib/prisma';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const teaching = await prisma.teachingService.findMany({
      orderBy: { order: 'asc' },
    });
    res.json(teaching);
  } catch (error) {
    console.error('Get teaching/services error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const item = await prisma.teachingService.findUnique({
      where: { id: req.params.id },
    });
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    console.error('Get teaching/service error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post(
  '/',
  authenticate,
  requireAdmin,
  [body('title').notEmpty(), body('institution').notEmpty(), body('role').notEmpty()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const item = await prisma.teachingService.create({ data: req.body });
      res.status(201).json(item);
    } catch (error) {
      console.error('Create teaching/service error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

router.put('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const item = await prisma.teachingService.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(item);
  } catch (error) {
    console.error('Update teaching/service error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    await prisma.teachingService.delete({ where: { id: req.params.id } });
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Delete teaching/service error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
