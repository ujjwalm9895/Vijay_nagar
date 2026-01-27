'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Mail, Linkedin, Github, GraduationCap } from 'lucide-react';
import { Section } from '@/components/section';
import { Card } from '@/components/card';
import { siteConfig } from '@/config/site';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="pt-32 pb-20">
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl"></div>
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-zinc-200 dark:border-zinc-800 shadow-2xl ring-4 ring-zinc-100 dark:ring-zinc-900">
                <Image
                  src="/profile.jpg"
                  alt="Vijay Nagar - Computer Vision Engineer"
                  width={224}
                  height={224}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="block">Vijay Nagar</span>
            </h1>
            <p className="text-xl sm:text-2xl text-zinc-600 dark:text-zinc-400 font-medium">
              Computer Vision Engineer | Applied AI Researcher
            </p>
            <p className="text-lg text-zinc-500 dark:text-zinc-500">
              ADAS & 3D Perception
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto leading-relaxed"
          >
            Designing robust perception systems at the intersection of deep learning,
            spatiotemporal modeling, and real-world autonomy.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed"
          >
            I am a Computer Vision Engineer with industry and research experience in building
            real-time perception systems for ADAS applications. My work spans multi-frame video
            understanding, 3D perception using LiDAR–camera fusion, AI safety, and
            foundation-model-inspired architectures. I enjoy translating theoretical ideas into
            deployable, production-grade systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
              <MapPin className="h-5 w-5" />
              <span>{siteConfig.location}</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
              <Mail className="h-5 w-5" />
              <a
                href={`mailto:${siteConfig.links.email}`}
                className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                {siteConfig.links.email}
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-center gap-4 pt-4"
          >
            {[
              { icon: Linkedin, href: siteConfig.links.linkedin, label: 'LinkedIn' },
              { icon: Github, href: siteConfig.links.github, label: 'GitHub' },
              { icon: GraduationCap, href: siteConfig.links.scholar, label: 'Google Scholar' },
            ].map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.1, y: -5, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-900 hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-500 hover:text-white transition-all shadow-md hover:shadow-xl"
                  aria-label={social.label}
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="pt-8"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/publications"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-zinc-900 to-zinc-800 dark:from-zinc-100 dark:to-zinc-200 text-white dark:text-black rounded-lg font-medium hover:from-zinc-800 hover:to-zinc-700 dark:hover:from-zinc-200 dark:hover:to-zinc-300 transition-all shadow-lg hover:shadow-xl"
              >
                View Publications
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* Quick Links */}
      <Section className="bg-zinc-50 dark:bg-zinc-950">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Research',
              description: 'Explore my research interests in computer vision and AI.',
              href: '/research-interests',
            },
            {
              title: 'Projects',
              description: 'Industry and academic projects in ADAS and computer vision.',
              href: '/industry-projects',
            },
            {
              title: 'Experience',
              description: 'Professional experience at Continental and TDB.ai.',
              href: '/experience',
            },
          ].map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1, duration: 0.5, type: 'spring', stiffness: 100 }}
            >
              <Card className="h-full group cursor-pointer">
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                    {card.description}
                  </p>
                  <Link
                    href={card.href}
                    className="text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 inline-flex items-center gap-1 transition-colors group/link"
                  >
                    Learn more
                    <motion.span
                      className="inline-block"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.span>
                  </Link>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>
    </>
  );
}
