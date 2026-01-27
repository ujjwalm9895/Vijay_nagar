'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/section';
import { Card } from '@/components/card';
import { Award, Trophy, GraduationCap } from 'lucide-react';

const achievements = [
  {
    icon: Award,
    title: '4 Spot (Key Player) Awards, 1 Star of the month (SOM), 1 Star of the quarter Award',
    description: 'Continental Autonomous Mobility',
    year: null,
  },
  {
    icon: Trophy,
    title: 'GATE 2018: 98.98 percentile',
    description: 'Graduate Aptitude Test in Engineering',
    year: 2018,
  },
  {
    icon: GraduationCap,
    title: 'IIT Indore M.Tech via GATE',
    description: 'Communication and Signal Processing',
    year: null,
  },
];

export default function AchievementsPage() {
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
              Achievements
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto"
            >
              Awards, recognitions, and milestones
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.15, duration: 0.5, type: 'spring', stiffness: 100 }}
                >
                  <Card className="h-full group">
                    <motion.div
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-3"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        className="p-3 rounded-lg bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 w-fit"
                      >
                        <Icon className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                      </motion.div>
                      <div>
                        <h2 className="text-xl font-semibold mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {achievement.title}
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                          {achievement.description}
                        </p>
                        {achievement.year && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-zinc-500 dark:text-zinc-500 text-sm mt-1"
                          >
                            {achievement.year}
                          </motion.p>
                        )}
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
