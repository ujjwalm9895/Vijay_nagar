import { Metadata } from 'next';
import { Section } from '@/components/section';
import { Card } from '@/components/card';
import { Mail, MapPin, Linkedin, Github, GraduationCap, MessageSquare } from 'lucide-react';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Vijay Nagar',
};

export default function ContactPage() {
  return (
    <>
      <Section className="pt-32">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold">Get In Touch</h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Interested in research collaboration, PhD opportunities, or applied AI projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <a
                      href={`mailto:${siteConfig.links.email}`}
                      className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                    >
                      {siteConfig.links.email}
                    </a>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Location</h3>
                    <p className="text-zinc-600 dark:text-zinc-400">{siteConfig.location}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <Card>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5" />
                <h2 className="text-2xl font-semibold">Connect</h2>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                  LinkedIn
                </a>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  <Github className="h-5 w-5" />
                  GitHub
                </a>
                <a
                  href={siteConfig.links.scholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  <GraduationCap className="h-5 w-5" />
                  Google Scholar
                </a>
              </div>
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}
