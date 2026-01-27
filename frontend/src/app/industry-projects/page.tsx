import { Metadata } from 'next';
import { Section } from '@/components/section';
import { Card } from '@/components/card';
import { Briefcase, Calendar, Target } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Industry Projects',
  description: 'Industry projects in ADAS and Computer Vision',
};

const projects = [
  {
    title: 'AI Safety & Security for ADAS',
    role: 'Computer Vision Engineer',
    timeline: '2026 - Present',
    description:
      'Developed safety-critical AI systems for autonomous driving applications with focus on robustness and reliability.',
    contributions: [
      'Implemented robust perception pipelines',
      'Ensured compliance with automotive safety standards',
      'Developed testing frameworks for AI safety',
    ],
    impact: 'Improved system reliability by 10%',
  },
  {
    title: '3D Traffic Sign Detection (LiDAR–Camera Fusion)',
    role: 'Computer Vision Engineer',
    timeline: '2024 - 2025',
    description:
      'Multi-modal fusion system for accurate 3D traffic sign detection using LiDAR and camera data.',
    contributions: [
      'Designed fusion architecture combining LiDAR and camera',
      'Optimized for real-time performance',
      'Implemented 3D localization algorithms',
    ],
    impact: 'Improved 7-8% 3D detection and localization accuracy compared basline model',
  },
  {
    title: 'Road Marking Detection (BEV)',
    role: 'Computer Vision Engineer',
    timeline: '2022 - 2023',
    description:
      "Bird's Eye View (BEV) based road marking detection system for Road markings.",
    contributions: [
      'Developed BEV transformation pipeline using camera calibration',
      'Optimized for edge deployment',
    ],
    impact: 'Reduced false positives by 15% and improve detection performance',
  },
  {
    title: 'Real-Time Traffic Sign & Light Detection',
    role: 'Computer Vision Engineer',
    timeline: '2023 - Present',
    description:
      'Real-time detection system for traffic signs and lights using deep learning on video streams.',
    contributions: [
      'Designed efficient CNN architecture',
      'Proposed mutiresolution input architecture to improve the small object detection performance',
      'Optimized inference pipeline',
      'Implemented temporal consistency checks',
    ],
    impact: 'Achieved a 3 ms runtime while accurately detecting signs over distances exceeding 120 meters.',
  },
  {
    title: 'Traffic Sign Recognition',
    role: 'Computer Vision Engineer',
    timeline: '2021 - 2023',
    description:
      'Multi-class traffic sign recognition system with high accuracy and robustness to variations.',
    contributions: [
      'Collected and annotated large-scale dataset',
      'Trained and fine-tuned recognition models',
      'Deployed on production systems',
    ],
    impact: 'Achieved an overall recognition accuracy of 94% across more than 300 classes.',
  },
];

export default function IndustryProjectsPage() {
  return (
    <>
      <Section className="pt-32">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold">Industry Projects</h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Production-grade computer vision systems for ADAS applications
            </p>
          </div>

          <div className="space-y-8">
            {projects.map((project, index) => (
              <Card key={index}>
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        {project.role}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {project.timeline}
                      </div>
                    </div>
                  </div>

                  <p className="text-zinc-700 dark:text-zinc-300">{project.description}</p>

                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Key Contributions:
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-zinc-600 dark:text-zinc-400">
                      {project.contributions.map((contribution, idx) => (
                        <li key={idx}>{contribution}</li>
                      ))}
                    </ul>
                  </div>

                  {project.impact && (
                    <div className="pt-2">
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        Impact: <span className="text-zinc-600 dark:text-zinc-400">{project.impact}</span>
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
