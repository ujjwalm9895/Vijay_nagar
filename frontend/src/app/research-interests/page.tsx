'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/section';
import { Card } from '@/components/card';
import { Brain, Eye, Shield, Rocket, Heart, Leaf } from 'lucide-react';

const interests = [
  {
    icon: Brain,
    title: 'Applied Deep Learning for Autonomous Systems',
    description: 'Developing deep learning solutions for real-world autonomous driving applications.',
  },
  {
    icon: Eye,
    title: 'Spatiotemporal & Multi-frame Perception',
    description: 'Understanding temporal dynamics in video sequences for robust perception.',
  },
  {
    icon: Rocket,
    title: 'Foundation Models for Vision & Robotics',
    description: 'Leveraging large-scale pre-trained models for vision and robotics tasks.',
  },
  {
    icon: Eye,
    title: 'Vision–Language Models',
    description: 'Bridging the gap between visual understanding and natural language.',
  },
  {
    icon: Eye,
    title: '3D Visual Understanding',
    description: 'Multi-modal 3D perception using LiDAR, camera, and sensor fusion.',
  },
  {
    icon: Brain,
    title: 'Causal Inference',
    description: 'Understanding cause-effect relationships in visual data.',
  },
  {
    icon: Shield,
    title: 'AI Safety & Robustness',
    description: 'Ensuring reliable and safe AI systems for critical applications.',
  },
  {
    icon: Brain,
    title: 'Reinforcement Learning',
    description: 'Learning optimal policies for autonomous decision-making.',
  },
  {
    icon: Brain,
    title: 'Human–AI Collaboration',
    description: 'Designing systems that enhance human capabilities through AI.',
  },
  {
    icon: Heart,
    title: 'AI for Healthcare & Sustainability',
    description: 'Applying AI to solve challenges in healthcare and environmental sustainability.',
  },
];

export default function ResearchInterestsPage() {
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
              Research Interests
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto"
            >
              Exploring the frontiers of computer vision, AI, and autonomous systems
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {interests.map((interest, index) => {
              const Icon = interest.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.1, duration: 0.5, type: 'spring', stiffness: 100 }}
                >
                  <Card className="group h-full">
                    <motion.div
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-start gap-4"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        className="p-3 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex-shrink-0"
                      >
                        <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </motion.div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {interest.title}
                        </h3>
                        <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                          {interest.description}
                        </p>
                      </div>
                    </motion.div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>
    </>
  );
}
