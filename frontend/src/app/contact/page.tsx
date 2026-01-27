'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/section';
import { Card } from '@/components/card';
import { Mail, MapPin, Linkedin, Github, GraduationCap, MessageSquare } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function ContactPage() {
  const socialLinks = [
    { icon: Linkedin, href: siteConfig.links.linkedin, label: 'LinkedIn' },
    { icon: Github, href: siteConfig.links.github, label: 'GitHub' },
    { icon: GraduationCap, href: siteConfig.links.scholar, label: 'Google Scholar' },
  ];

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
              Get In Touch
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto"
            >
              Interested in research collaboration, PhD opportunities, or applied AI projects.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Mail,
                title: 'Email',
                content: siteConfig.links.email,
                href: `mailto:${siteConfig.links.email}`,
              },
              {
                icon: MapPin,
                title: 'Location',
                content: siteConfig.location,
                href: null,
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: index * 0.2, duration: 0.5, type: 'spring', stiffness: 100 }}
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
                          className="p-3 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30"
                        >
                          <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </motion.div>
                        <div>
                          <h3 className="font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {item.title}
                          </h3>
                          {item.href ? (
                            <a
                              href={item.href}
                              className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                              {item.content}
                            </a>
                          ) : (
                            <p className="text-zinc-600 dark:text-zinc-400">{item.content}</p>
                          )}
                        </div>
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
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <h2 className="text-2xl font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Connect
                  </h2>
                </div>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + index * 0.1, type: 'spring', stiffness: 200 }}
                        whileHover={{ scale: 1.1, y: -3, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 hover:from-blue-200 hover:to-purple-200 dark:hover:from-blue-800/50 dark:hover:to-purple-800/50 rounded-lg transition-all shadow-md hover:shadow-lg"
                      >
                        <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        {social.label}
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            </Card>
          </motion.div>
        </div>
      </Section>
    </>
  );
}
