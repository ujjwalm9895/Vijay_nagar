import express from 'express';
import { body, validationResult } from 'express-validator';
import { prisma } from '../lib/prisma';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = express.Router();

// Get all publications (public)
router.get('/', async (req, res) => {
  try {
    const publications = await prisma.publication.findMany({
      orderBy: { order: 'asc' },
    });
    res.json(publications);
  } catch (error) {
    console.error('Get publications error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single publication (public)
router.get('/:id', async (req, res) => {
  try {
    const publication = await prisma.publication.findUnique({
      where: { id: req.params.id },
    });

    if (!publication) {
      return res.status(404).json({ error: 'Publication not found' });
    }

    res.json(publication);
  } catch (error) {
    console.error('Get publication error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create publication (admin only)
router.post(
  '/',
  authenticate,
  requireAdmin,
  [
    body('title').notEmpty(),
    body('authors').notEmpty(),
    body('description').notEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const publication = await prisma.publication.create({
        data: req.body,
      });

      res.status(201).json(publication);
    } catch (error) {
      console.error('Create publication error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// Update publication (admin only)
router.put(
  '/:id',
  authenticate,
  requireAdmin,
  async (req, res) => {
    try {
      const publication = await prisma.publication.update({
        where: { id: req.params.id },
        data: req.body,
      });

      res.json(publication);
    } catch (error) {
      console.error('Update publication error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// Delete publication (admin only)
router.delete(
  '/:id',
  authenticate,
  requireAdmin,
  async (req, res) => {
    try {
      await prisma.publication.delete({
        where: { id: req.params.id },
      });

      res.json({ message: 'Publication deleted successfully' });
    } catch (error) {
      console.error('Delete publication error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

export default router;
