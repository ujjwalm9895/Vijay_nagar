'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/section';
import { Card } from '@/components/card';
import { Briefcase, Calendar, Target } from 'lucide-react';

const projects = [
  {
    title: 'AI Safety & Security for ADAS',
    role: 'Computer Vision Engineer',
    timeline: '2026 - Present',
    description:
      'Developed safety-critical AI systems for autonomous driving applications with focus on robustness and reliability.',
    contributions: [
      'Implemented robust perception pipelines',
      'Ensured compliance with automotive safety standards',
      'Developed testing frameworks for AI safety',
    ],
    impact: 'Improved system reliability by 10%',
  },
  {
    title: '3D Traffic Sign Detection (LiDAR–Camera Fusion)',
    role: 'Computer Vision Engineer',
    timeline: '2024 - 2025',
    description:
      'Multi-modal fusion system for accurate 3D traffic sign detection using LiDAR and camera data.',
    contributions: [
      'Designed fusion architecture combining LiDAR and camera',
      'Optimized for real-time performance',
      'Implemented 3D localization algorithms',
    ],
    impact: 'Improved 7-8% 3D detection and localization accuracy compared basline model',
  },
  {
    title: 'Road Marking Detection (BEV)',
    role: 'Computer Vision Engineer',
    timeline: 'April 2025 - July 2025',
    description:
      "Bird's Eye View (BEV) based road marking detection system by transforming front camera images using caliberation data.",
    contributions: [
      'Developed BEV transformation pipeline using camera calibration',
      'Optimized for edge deployment',
    ],
    impact: 'Reduced false positives by 15% and improve detection performance',
  },
  {
    title: 'Real-Time Traffic Sign & Light Detection',
    role: 'Computer Vision Engineer',
    timeline: '2023 - Present',
    description:
      'Real-time detection system for traffic signs and lights using deep learning on video streams.',
    contributions: [
      'Designed efficient CNN architecture',
      'Proposed mutiresolution input architecture to improve the small object detection performance',
      'Optimized inference pipeline',
      'Implemented temporal consistency checks',
    ],
    impact: 'Achieved a 3 ms runtime while accurately detecting signs over distances exceeding 120 meters.',
  },
  {
    title: 'Traffic Sign Recognition',
    role: 'Computer Vision Engineer',
    timeline: '2021 - 2023',
    description:
      'Multi-class traffic sign recognition system with high accuracy and robustness to variations.',
    contributions: [
      'Collected and annotated large-scale dataset',
      'Trained and fine-tuned recognition models',
      'Deployed on production systems',
    ],
    impact: 'Achieved an overall recognition accuracy of 94% across more than 300 classes.',
  },
];

export default function IndustryProjectsPage() {
  return (
    <>
      <Section className="pt-32">
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-zinc-900 via-blue-600 to-purple-600 dark:from-zinc-100 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent"
            >
              Industry Projects
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto"
            >
              Production-grade computer vision systems for ADAS applications
            </motion.p>
          </motion.div>

          <div className="space-y-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.15, duration: 0.5, type: 'spring', stiffness: 100 }}
              >
                <Card className="group">
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div>
                      <motion.h2
                        whileHover={{ scale: 1.02 }}
                        className="text-2xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                      >
                        {project.title}
                      </motion.h2>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4" />
                          {project.role}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {project.timeline}
                        </div>
                      </div>
                    </div>

                    <p className="text-zinc-700 dark:text-zinc-300">{project.description}</p>

                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        Key Contributions:
                      </h3>
                      <ul className="list-disc list-inside space-y-1 text-zinc-600 dark:text-zinc-400">
                        {project.contributions.map((contribution, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + idx * 0.1 }}
                            whileHover={{ x: 5, color: '#3b82f6' }}
                            className="transition-colors cursor-default"
                          >
                            {contribution}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {project.impact && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="pt-2"
                      >
                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                          Impact: <span className="text-zinc-600 dark:text-zinc-400">{project.impact}</span>
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
