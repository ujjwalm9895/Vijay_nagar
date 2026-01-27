'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/section';
import { Card } from '@/components/card';
import { ExternalLink, FileText } from 'lucide-react';

const publication = {
  title:
    'STAlign-Net: Multi-Frame Spatiotemporal Feature Aggregation with Convolution-based Deformable Cross-Attention for Video Traffic Light Detection',
  conference: 'IEEE CONECCT 2025',
  venue: 'Bengaluru',
  year: 2025,
  authors: 'Vijay Nagar, S. Kizhiyedath, T. R. Ratheesh',
  description:
    'Multi-frame spatiotemporal alignment using convolution-based deformable cross-attention on a CenterNet backbone.',
  contributions: [
    'Multi-frame alignment',
    'Deformable cross-attention',
    'Robust detection under blur, motion, occlusion by leveraging spatio-temporal information',
  ],
    doi: 'https://ieeexplore.ieee.org/document/11306544/references#references',
    pdfUrl: 'https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=11306544',
};

export default function PublicationsPage() {
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
              Publications
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto"
            >
              Research contributions in computer vision and AI
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: 0.3, duration: 0.5, type: 'spring', stiffness: 100 }}
          >
            <Card className="group hover:shadow-2xl transition-all duration-300">
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
                    {publication.title}
                  </motion.h2>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    {publication.conference} {publication.year} • {publication.venue}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-2">
                    {publication.authors}
                  </p>
                </div>

                <p className="text-zinc-700 dark:text-zinc-300">{publication.description}</p>

                <div>
                  <h3 className="font-semibold mb-2">Key Contributions:</h3>
                  <ul className="list-disc list-inside space-y-1 text-zinc-600 dark:text-zinc-400">
                    {publication.contributions.map((contribution, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        whileHover={{ x: 5, color: '#3b82f6' }}
                        className="transition-colors cursor-default"
                      >
                        {contribution}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className="flex gap-4 pt-4"
                >
                  {publication.doi && (
                    <motion.a
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      href={publication.doi}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 hover:from-blue-200 hover:to-purple-200 dark:hover:from-blue-800/50 dark:hover:to-purple-800/50 rounded-lg transition-all text-sm font-medium text-blue-700 dark:text-blue-300 shadow-md hover:shadow-lg"
                    >
                      <ExternalLink className="h-4 w-4" />
                      DOI
                    </motion.a>
                  )}
                  {publication.pdfUrl && (
                    <motion.a
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      href={publication.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 hover:from-blue-200 hover:to-purple-200 dark:hover:from-blue-800/50 dark:hover:to-purple-800/50 rounded-lg transition-all text-sm font-medium text-blue-700 dark:text-blue-300 shadow-md hover:shadow-lg"
                    >
                      <FileText className="h-4 w-4" />
                      PDF
                    </motion.a>
                  )}
                </motion.div>
              </motion.div>
            </Card>
          </motion.div>
        </div>
      </Section>
    </>
  );
}
