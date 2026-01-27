import { Metadata } from 'next';
import { Section } from '@/components/section';
import { Card } from '@/components/card';
import { GraduationCap, Briefcase, Target } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About',
  description: 'About Vijay Nagar - Computer Vision Engineer and Applied AI Researcher',
};

export default function AboutPage() {
  return (
    <>
      <Section className="pt-32">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold">About Me</h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              M.Tech in Communication and Signal Processing from IIT Indore. Experience at
              Continental Autonomous Mobility working on traffic signs, traffic lights, road
              markings, and 3D mapping pipelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Education</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    M.Tech in Communication and Signal Processing from IIT Indore. GATE 2018:
                    98.98 percentile.
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800">
                  <Briefcase className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Industry Experience</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Computer Vision Engineer at Continental Autonomous Mobility, working on ADAS
                    perception systems since October 2021.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <Card>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800">
                <Target className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Research Interests</h3>
                <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
                  <li>• Computer vision</li>
                  <li>• 3D perception</li>
                  <li>• Machine Learning</li>
                  <li>• Foundation-model-based vision</li>
                  <li>• Causal reasoning & robustness</li>
                  <li>• AI Based decision making</li>
                  <li>• Safety-critical AI</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}
