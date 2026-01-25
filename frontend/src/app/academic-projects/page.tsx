import { Metadata } from 'next';
import { Section } from '@/components/section';
import { Card } from '@/components/card';
import { GraduationCap, Code } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Academic Projects',
  description: 'Academic research projects in Computer Vision and Signal Processing',
};

const projects = [
  {
    title: 'Contactless Fingerprint Recognition (Siamese CNN)',
    description:
      'Developed a Siamese Convolutional Neural Network for contactless fingerprint recognition. The system uses deep learning to match fingerprints captured without physical contact, addressing hygiene and usability concerns in biometric systems.',
    technologies: 'PyTorch, OpenCV, Siamese Networks',
  },
  {
    title: 'Moving Window-based Double Haar Wavelet Transform',
    description:
      'Implemented a novel signal processing technique using moving window approach with double Haar wavelet transform for efficient feature extraction and analysis of time-series signals.',
    technologies: 'MATLAB, Signal Processing, Wavelet Transform',
  },
];

export default function AcademicProjectsPage() {
  return (
    <>
      <Section className="pt-32">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold">Academic Projects</h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Research projects during M.Tech at IIT Indore
            </p>
          </div>

          <div className="space-y-6">
            {projects.map((project, index) => (
              <Card key={index}>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex-shrink-0">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
                      <p className="text-zinc-700 dark:text-zinc-300 mb-3">
                        {project.description}
                      </p>
                      {project.technologies && (
                        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                          <Code className="h-4 w-4" />
                          <span>{project.technologies}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
