import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { prisma } from '../lib/prisma';
import { authenticate, requireAdmin, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Industry Projects
router.get('/industry', async (req: Request, res: Response) => {
  try {
    const projects = await prisma.industryProject.findMany({
      orderBy: { order: 'asc' },
    });
    res.json(projects);
  } catch (error) {
    console.error('Get industry projects error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/industry/:id', async (req: Request, res: Response) => {
  try {
    const project = await prisma.industryProject.findUnique({
      where: { id: req.params.id },
    });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error('Get industry project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post(
  '/industry',
  authenticate,
  requireAdmin,
  [body('title').notEmpty(), body('role').notEmpty()],
  async (req: AuthRequest, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const project = await prisma.industryProject.create({ data: req.body });
      res.status(201).json(project);
    } catch (error) {
      console.error('Create industry project error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

router.put('/industry/:id', authenticate, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const project = await prisma.industryProject.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(project);
  } catch (error) {
    console.error('Update industry project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/industry/:id', authenticate, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    await prisma.industryProject.delete({ where: { id: req.params.id } });
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete industry project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Academic Projects
router.get('/academic', async (req: Request, res: Response) => {
  try {
    const projects = await prisma.academicProject.findMany({
      orderBy: { order: 'asc' },
    });
    res.json(projects);
  } catch (error) {
    console.error('Get academic projects error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/academic/:id', async (req: Request, res: Response) => {
  try {
    const project = await prisma.academicProject.findUnique({
      where: { id: req.params.id },
    });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error('Get academic project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post(
  '/academic',
  authenticate,
  requireAdmin,
  [body('title').notEmpty(), body('description').notEmpty()],
  async (req: AuthRequest, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const project = await prisma.academicProject.create({ data: req.body });
      res.status(201).json(project);
    } catch (error) {
      console.error('Create academic project error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

router.put('/academic/:id', authenticate, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const project = await prisma.academicProject.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(project);
  } catch (error) {
    console.error('Update academic project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/academic/:id', authenticate, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    await prisma.academicProject.delete({ where: { id: req.params.id } });
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete academic project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
