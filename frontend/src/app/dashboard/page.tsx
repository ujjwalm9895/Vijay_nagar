'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/section';
import { Card } from '@/components/card';
import { TrendingUp, TrendingDown, Award, Briefcase, GraduationCap, Target, BarChart3, PieChart, LineChart, Activity } from 'lucide-react';

// Mock data for visualizations
const stats = [
  { label: 'Publications', value: 1, change: '+1', trend: 'up', icon: GraduationCap },
  { label: 'Industry Projects', value: 5, change: '+2', trend: 'up', icon: Briefcase },
  { label: 'Years Experience', value: 3.5, change: '+0.5', trend: 'up', icon: Activity },
  { label: 'Awards', value: 6, change: '+2', trend: 'up', icon: Award },
];

const projectTimeline = [
  { year: 2021, projects: 1, label: 'Traffic Sign Recognition' },
  { year: 2022, projects: 0, label: '' },
  { year: 2023, projects: 1, label: 'Traffic Sign & Light Detection' },
  { year: 2024, projects: 1, label: '3D Traffic Sign Detection' },
  { year: 2025, projects: 2, label: 'Road Marking Detection, AI Safety' },
];

const skillDistribution = [
  { category: 'Computer Vision', percentage: 40, color: 'bg-blue-500' },
  { category: 'Deep Learning', percentage: 30, color: 'bg-purple-500' },
  { category: '3D Perception', percentage: 15, color: 'bg-pink-500' },
  { category: 'AI Safety', percentage: 10, color: 'bg-orange-500' },
  { category: 'Signal Processing', percentage: 5, color: 'bg-green-500' },
];

const researchAreas = [
  { area: 'Spatiotemporal Perception', interest: 95 },
  { area: '3D Vision', interest: 90 },
  { area: 'Foundation Models', interest: 85 },
  { area: 'AI Safety', interest: 80 },
  { area: 'Causal Inference', interest: 75 },
];

export default function DashboardPage() {
  return (
    <>
      <Section className="pt-32">
        <div className="space-y-8">
          {/* Header */}
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
              Analytics Dashboard
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto"
            >
              Data-driven insights into research, projects, and achievements
            </motion.p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.1, duration: 0.5, type: 'spring', stiffness: 100 }}
                >
                  <Card className="group hover:shadow-2xl transition-all">
                    <motion.div
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="p-3 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
                          <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        {stat.trend === 'up' ? (
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="flex items-center gap-1 text-green-600 dark:text-green-400"
                          >
                            <TrendingUp className="h-4 w-4" />
                            <span className="text-sm font-medium">{stat.change}</span>
                          </motion.div>
                        ) : (
                          <motion.div className="flex items-center gap-1 text-red-600 dark:text-red-400">
                            <TrendingDown className="h-4 w-4" />
                            <span className="text-sm font-medium">{stat.change}</span>
                          </motion.div>
                        )}
                      </div>
                      <div>
                        <p className="text-3xl font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {stat.value}
                        </p>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{stat.label}</p>
                      </div>
                    </motion.div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Project Timeline Chart */}
            <motion.div
              initial={{ opacity: 0, x: -50, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.4, duration: 0.5, type: 'spring', stiffness: 100 }}
            >
              <Card className="h-full group">
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <LineChart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    <h2 className="text-2xl font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      Project Timeline
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {projectTimeline.map((item, index) => (
                      <motion.div
                        key={item.year}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            {item.year}
                          </span>
                          <span className="text-sm text-zinc-600 dark:text-zinc-400">
                            {item.projects} {item.projects === 1 ? 'project' : 'projects'}
                          </span>
                        </div>
                        <div className="relative h-4 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${(item.projects / 2) * 100}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 + index * 0.1, duration: 0.8, ease: 'easeOut' }}
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                          />
                        </div>
                        {item.label && (
                          <p className="text-xs text-zinc-500 dark:text-zinc-500">{item.label}</p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </Card>
            </motion.div>

            {/* Skill Distribution Pie Chart */}
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.4, duration: 0.5, type: 'spring', stiffness: 100 }}
            >
              <Card className="h-full group">
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <PieChart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    <h2 className="text-2xl font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      Skill Distribution
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {skillDistribution.map((skill, index) => (
                      <motion.div
                        key={skill.category}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            {skill.category}
                          </span>
                          <span className="text-sm text-zinc-600 dark:text-zinc-400">
                            {skill.percentage}%
                          </span>
                        </div>
                        <div className="relative h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.percentage}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 + index * 0.1, duration: 0.8, ease: 'easeOut' }}
                            className={`h-full ${skill.color} rounded-full`}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </Card>
            </motion.div>
          </div>

          {/* Research Interest Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: 0.6, duration: 0.5, type: 'spring', stiffness: 100 }}
          >
            <Card className="group">
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  <h2 className="text-2xl font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Research Interest Levels
                  </h2>
                </div>
                <div className="space-y-4">
                  {researchAreas.map((area, index) => (
                    <motion.div
                      key={area.area}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          {area.area}
                        </span>
                        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                          {area.interest}%
                        </span>
                      </div>
                      <div className="relative h-6 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${area.interest}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.8 + index * 0.1, duration: 1, ease: 'easeOut' }}
                          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </Card>
          </motion.div>
        </div>
      </Section>
    </>
  );
}
