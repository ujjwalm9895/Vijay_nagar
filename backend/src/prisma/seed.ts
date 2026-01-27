/// <reference types="node" />
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || 'changeme123',
    10
  );

  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@example.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
    },
  });

  console.log('✅ Admin user created:', admin.email);

  // Seed publications
  const publication = await prisma.publication.create({
    data: {
      title:
        'STAlign-Net: Multi-Frame Spatiotemporal Feature Aggregation with Convolution-based Deformable Cross-Attention for Video Traffic Light Detection',
      conference: 'IEEE CONECCT 2025',
      venue: 'Bengaluru',
      year: 2025,
      authors: 'Vijay Nagar, S. Kizhiyedath, T. R. Ratheesh',
      description:
        'Multi-frame spatiotemporal alignment using convolution-based deformable cross-attention on a CenterNet backbone.',
      doi: 'https://ieeexplore.ieee.org/document/11306544/references#references',
      pdfUrl: 'https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=11306544',
      order: 0,
    },
  });

  console.log('✅ Publication seeded:', publication.title);

  // Seed industry projects
  const industryProjects = [
    {
      title: 'AI Safety & Security for ADAS',
      role: 'Computer Vision Engineer',
      timeline: '2026 - Present',
      description: 'Developed safety-critical AI systems for autonomous driving applications.',
      contributions: [
        'Implemented robust perception pipelines',
        'Ensured compliance with automotive safety standards',
      ],
      impact: 'Improved system reliability by 10%',
      order: 0,
    },
    {
      title: '3D Traffic Sign Detection (LiDAR–Camera Fusion)',
      role: 'Computer Vision Engineer',
      timeline: '2024 - 2025',
      description: 'Multi-modal fusion system for accurate 3D traffic sign detection.',
      contributions: [
        'Designed fusion architecture',
        'Optimized for real-time performance',
      ],
      impact: 'Improved 7-8% 3D detection and localization accuracy compared basline model',
      order: 1,
    },
  ];

  for (const project of industryProjects) {
    await prisma.industryProject.create({ data: project });
  }

  console.log('✅ Industry projects seeded');

  // Seed experience
  const experiences = [
    {
      title: 'Computer Vision Engineer',
      company: 'Continental Autonomous Mobility',
      location: 'Bangalore, India',
      startDate: 'Oct 2021',
      endDate: null,
      current: true,
      description: 'Working on ADAS perception systems',
      achievements: ['4 Spot Awards'],
      order: 0,
    },
    {
      title: 'Junior Deep Learning Engineer',
      company: 'TDB.ai',
      location: 'Bangalore, India',
      startDate: 'Jul 2021',
      endDate: 'Oct 2021',
      current: false,
      order: 1,
    },
  ];

  for (const exp of experiences) {
    await prisma.experience.create({ data: exp });
  }

  console.log('✅ Experience seeded');

  // Seed achievements
  const achievements = [
    {
      title: '4 Spot Awards',
      description: 'Continental',
      year: null,
      order: 0,
    },
    {
      title: 'GATE 2018: 98.98 percentile',
      description: 'Graduate Aptitude Test in Engineering',
      year: 2018,
      order: 1,
    },
    {
      title: 'IIT Indore M.Tech via GATE',
      description: 'Communication and Signal Processing',
      year: null,
      order: 2,
    },
  ];

  for (const achievement of achievements) {
    await prisma.achievement.create({ data: achievement });
  }

  console.log('✅ Achievements seeded');

  // Seed teaching & service
  const teaching = [
    {
      title: 'Teaching Assistant',
      institution: 'IIT Indore',
      role: 'TA',
      period: '2019-2021',
      description: 'Assisted in undgraduate students for Electrical engineering subjects',
      order: 0,
    },
    {
      title: 'Subject Matter Expert',
      institution: 'Six Red Marbles',
      role: 'SME',
      period: '2020-2021',
      description: 'Content development for educational materials',
      order: 1,
    },
  ];

  for (const item of teaching) {
    await prisma.teachingService.create({ data: item });
  }

  console.log('✅ Teaching & Service seeded');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
