import { Metadata } from 'next';
import { Section } from '@/components/section';
import { Card } from '@/components/card';
import { Brain, Eye, Shield, Rocket, Heart, Leaf } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Research Interests',
  description: 'Research interests in Computer Vision, AI, and Autonomous Systems',
};

const interests = [
  {
    icon: Brain,
    title: 'Applied Deep Learning for Autonomous Systems',
    description: 'Developing deep learning solutions for real-world autonomous driving applications.',
  },
  {
    icon: Eye,
    title: 'Spatiotemporal & Multi-frame Perception',
    description: 'Understanding temporal dynamics in video sequences for robust perception.',
  },
  {
    icon: Rocket,
    title: 'Foundation Models for Vision & Robotics',
    description: 'Leveraging large-scale pre-trained models for vision and robotics tasks.',
  },
  {
    icon: Eye,
    title: 'Vision–Language Models',
    description: 'Bridging the gap between visual understanding and natural language.',
  },
  {
    icon: Eye,
    title: '3D Visual Understanding',
    description: 'Multi-modal 3D perception using LiDAR, camera, and sensor fusion.',
  },
  {
    icon: Brain,
    title: 'Causal Inference',
    description: 'Understanding cause-effect relationships in visual data.',
  },
  {
    icon: Shield,
    title: 'AI Safety & Robustness',
    description: 'Ensuring reliable and safe AI systems for critical applications.',
  },
  {
    icon: Brain,
    title: 'Reinforcement Learning',
    description: 'Learning optimal policies for autonomous decision-making.',
  },
  {
    icon: Brain,
    title: 'Human–AI Collaboration',
    description: 'Designing systems that enhance human capabilities through AI.',
  },
  {
    icon: Heart,
    title: 'AI for Healthcare & Sustainability',
    description: 'Applying AI to solve challenges in healthcare and environmental sustainability.',
  },
];

export default function ResearchInterestsPage() {
  return (
    <>
      <Section className="pt-32">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold">Research Interests</h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Exploring the frontiers of computer vision, AI, and autonomous systems
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {interests.map((interest, index) => {
              const Icon = interest.icon;
              return (
                <Card key={index}>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex-shrink-0">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{interest.title}</h3>
                      <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                        {interest.description}
                      </p>
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
