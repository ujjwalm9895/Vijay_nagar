'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/section';
import { Card } from '@/components/card';
import { Briefcase, MapPin, Calendar, Award } from 'lucide-react';
import { formatDate } from '@/lib/utils';

const experiences = [
  {
    title: 'Computer Vision Engineer',
    company: 'Continental Autonomous Mobility',
    location: 'Bangalore, India',
    startDate: 'Oct 2021',
    endDate: null,
    current: true,
    description:
      'Working on ADAS perception systems including traffic signs, traffic lights, road markings, and 3D mapping pipelines. Developing production-grade computer vision solutions for autonomous driving.',
    achievements: ['4 Spot Awards for outstanding contributions'],
  },
  {
    title: 'Junior Deep Learning Engineer',
    company: 'TDB.ai',
    location: 'Bangalore, India',
    startDate: 'Jul 2021',
    endDate: 'Oct 2021',
    current: false,
    description:
      'Developed deep learning models for various computer vision applications. Worked on model optimization and deployment.',
  },
];

export default function ExperiencePage() {
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
              Experience
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto"
            >
              Professional journey in computer vision and AI
            </motion.p>
          </motion.div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
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
                    <div>
                      <motion.h2
                        whileHover={{ scale: 1.02 }}
                        className="text-2xl font-semibold mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                      >
                        {exp.title}
                      </motion.h2>
                      <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-3">{exp.company}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {exp.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {exp.startDate} - {formatDate(exp.endDate)}
                          {exp.current && (
                            <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs font-medium">
                              Current
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <p className="text-zinc-700 dark:text-zinc-300">{exp.description}</p>

                    {exp.achievements && (
                      <div>
                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                          >
                            <Award className="h-4 w-4 text-yellow-500" />
                          </motion.div>
                          Achievements:
                        </h3>
                        <ul className="list-disc list-inside space-y-1 text-zinc-600 dark:text-zinc-400">
                          {exp.achievements.map((achievement, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.3 + idx * 0.1 }}
                              whileHover={{ x: 5, color: '#3b82f6' }}
                              className="transition-colors cursor-default"
                            >
                              {achievement}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
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
