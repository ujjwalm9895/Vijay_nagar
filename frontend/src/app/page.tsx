import { Metadata } from 'next';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Mail, Linkedin, Github, GraduationCap } from 'lucide-react';
import { Section } from '@/components/section';
import { Card } from '@/components/card';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Home',
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="pt-32 pb-20">
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
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
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={siteConfig.links.scholar}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Google Scholar"
            >
              <GraduationCap className="h-5 w-5" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="pt-8"
          >
            <Link
              href="/publications"
              className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black rounded-lg font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
            >
              View Publications
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </Section>

      {/* Quick Links */}
      <Section className="bg-zinc-50 dark:bg-zinc-950">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <h3 className="text-xl font-semibold mb-2">Research</h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              Explore my research interests in computer vision and AI.
            </p>
            <Link
              href="/research-interests"
              className="text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:underline inline-flex items-center gap-1"
            >
              Learn more <ArrowRight className="h-4 w-4" />
            </Link>
          </Card>

          <Card>
            <h3 className="text-xl font-semibold mb-2">Projects</h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              Industry and academic projects in ADAS and computer vision.
            </p>
            <Link
              href="/industry-projects"
              className="text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:underline inline-flex items-center gap-1"
            >
              View projects <ArrowRight className="h-4 w-4" />
            </Link>
          </Card>

          <Card>
            <h3 className="text-xl font-semibold mb-2">Experience</h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              Professional experience at Continental and TDB.ai.
            </p>
            <Link
              href="/experience"
              className="text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:underline inline-flex items-center gap-1"
            >
              View experience <ArrowRight className="h-4 w-4" />
            </Link>
          </Card>
        </div>
      </Section>
    </>
  );
}
