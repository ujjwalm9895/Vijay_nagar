import Link from 'next/link';
import { Linkedin, Github, Mail, GraduationCap } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-zinc-900 dark:text-zinc-100">
              Vijay Nagar
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Computer Vision Engineer & Applied AI Researcher
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
              Interested in research collaboration, PhD opportunities, or applied AI projects.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 text-zinc-900 dark:text-zinc-100">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/publications"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                >
                  Publications
                </Link>
              </li>
              <li>
                <Link
                  href="/industry-projects"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4 text-zinc-900 dark:text-zinc-100">
              Connect
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${siteConfig.links.email}`}
                className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                <Mail className="h-4 w-4" />
                {siteConfig.links.email}
              </a>
              <div className="flex gap-4">
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href={siteConfig.links.scholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                  aria-label="Google Scholar"
                >
                  <GraduationCap className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-center text-sm text-zinc-600 dark:text-zinc-400">
          <p>© {new Date().getFullYear()} Vijay Nagar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
