'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/section';
import { Card } from '@/components/card';
import { GraduationCap, Users, Calendar } from 'lucide-react';

const teaching = [
  {
    title: 'Teaching Assistant',
    institution: 'IIT Indore',
    role: 'TA',
    period: '2018-2020',
    description: 'Assisted Electrical engineering courses, conducted lab sessions, and mentored students.',
  },
  {
    title: 'Subject Matter Expert',
    institution: 'Six Red Marbles',
    role: 'SME',
    period: '2020-2021',
    description: 'Content development for educational materials in Mathamatics and Electrical Engineering.',
  },
];

export default function TeachingPage() {
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
              Teaching & Service
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto"
            >
              Academic contributions and educational service
            </motion.p>
          </motion.div>

          <div className="space-y-6">
            {teaching.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.2, duration: 0.5, type: 'spring', stiffness: 100 }}
              >
                <Card className="group">
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="flex items-start gap-4">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="p-3 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex-shrink-0"
                      >
                        <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </motion.div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-semibold mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {item.title}
                        </h2>
                        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-3">
                          {item.institution}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            {item.role}
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {item.period}
                          </div>
                        </div>
                        <p className="text-zinc-700 dark:text-zinc-300">{item.description}</p>
                      </div>
                    </div>
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
