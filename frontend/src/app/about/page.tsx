'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Section } from '@/components/section';
import { Card } from '@/components/card';
import { GraduationCap, Briefcase, Target } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <Section className="pt-32">
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="flex justify-center"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl"
                />
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-zinc-200 dark:border-zinc-800 shadow-xl ring-4 ring-zinc-100 dark:ring-zinc-900">
                  <Image
                    src="/profile.jpg"
                    alt="Vijay Nagar"
                    width={192}
                    height={192}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-zinc-900 via-blue-600 to-purple-600 dark:from-zinc-100 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                About Me
              </h1>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                M.Tech in Communication and Signal Processing from IIT Indore. Experience at
                Continental Autonomous Mobility working on traffic signs, traffic lights, road
                markings, and 3D mapping pipelines.
              </p>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: GraduationCap,
                title: 'Education',
                content: 'M.Tech in Communication and Signal Processing from IIT Indore. GATE 2018: 98.98 percentile.',
              },
              {
                icon: Briefcase,
                title: 'Industry Experience',
                content: 'Computer Vision Engineer at Continental Autonomous Mobility, working on ADAS perception systems since October 2021.',
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.2, duration: 0.5, type: 'spring', stiffness: 100 }}
                >
                  <Card className="h-full group">
                    <motion.div
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-start gap-4"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="p-3 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30"
                      >
                        <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-zinc-600 dark:text-zinc-400">
                          {item.content}
                        </p>
                      </div>
                    </motion.div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: 0.4, duration: 0.5, type: 'spring', stiffness: 100 }}
          >
            <Card className="group">
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-4"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="p-3 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30"
                >
                  <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Research Interests
                  </h3>
                  <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
                    {[
                      'Computer vision',
                      '3D perception',
                      'Machine Learning',
                      'Foundation-model-based vision',
                      'Causal reasoning & robustness',
                      'AI Based decision making',
                      'Safety-critical AI',
                    ].map((interest, index) => (
                      <motion.li
                        key={interest}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + index * 0.05 }}
                        whileHover={{ x: 5, color: '#3b82f6' }}
                        className="transition-colors cursor-default"
                      >
                        • {interest}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </Card>
          </motion.div>
        </div>
      </Section>
    </>
  );
}
