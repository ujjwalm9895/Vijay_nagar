'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/section';
import { Card } from '@/components/card';
import { Code, Wrench, Brain } from 'lucide-react';

const skillCategories = [
  {
    icon: Code,
    title: 'Programming Languages',
    skills: ['Python', 'C++', 'MATLAB', 'SQL'],
  },
  {
    icon: Brain,
    title: 'Frameworks & Libraries',
    skills: ['PyTorch', 'TensorFlow', 'Keras', 'OpenCV', 'MLFlow', 'Wandb'],
  },
  {
    icon: Wrench,
    title: 'Tools & Technologies',
    skills: ['Docker', 'Git', 'Linux', 'Jenkins', 'LaTeX', 'Colab'],
  },
  {
    icon: Brain,
    title: 'Domains',
    skills: [
      'Image processing',
      'Computer Vision',
      'Machine Learning',
      'Deep Learning',
      'Transformers',
      'Signal Processing',
      'ADAS',
      '3D Vision',
    ],
  },
];

export default function SkillsPage() {
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
              Skills
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto"
            >
              Technical expertise and tools
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.15, duration: 0.5, type: 'spring', stiffness: 100 }}
                >
                  <Card className="group h-full">
                    <motion.div
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center gap-3">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className="p-2 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30"
                        >
                          <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </motion.div>
                        <h2 className="text-xl font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {category.title}
                        </h2>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill, idx) => (
                          <motion.span
                            key={idx}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 + idx * 0.05, type: 'spring', stiffness: 200 }}
                            whileHover={{ scale: 1.1, y: -2 }}
                            className="px-3 py-1 bg-gradient-to-r from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 rounded-full text-sm font-medium cursor-default hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 transition-all"
                          >
                            {skill}
                          </motion.span>
                        ))}
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
