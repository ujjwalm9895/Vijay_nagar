import { Metadata } from 'next';
import { Section } from '@/components/section';
import { Card } from '@/components/card';
import { Code, Wrench, Brain } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Skills',
  description: 'Technical skills and expertise',
};

const skillCategories = [
  {
    icon: Code,
    title: 'Programming Languages',
    skills: ['Python', 'C++', 'MATLAB', 'SQL'],
  },
  {
    icon: Brain,
    title: 'Frameworks & Libraries',
    skills: ['PyTorch', 'TensorFlow', 'Keras', 'OpenCV'],
  },
  {
    icon: Wrench,
    title: 'Tools & Technologies',
    skills: ['Docker', 'Git', 'Linux', 'Jenkins', 'LaTeX'],
  },
  {
    icon: Brain,
    title: 'Domains',
    skills: [
      'Computer Vision',
      'Deep Learning',
      'Transformers',
      'Signal Processing',
      'ADAS',
      '3D Vision',
    ],
  },
];

export default function SkillsPage() {
  return (
    <>
      <Section className="pt-32">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold">Skills</h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Technical expertise and tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card key={index}>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h2 className="text-xl font-semibold">{category.title}</h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </Section>
    </>
  );
}
