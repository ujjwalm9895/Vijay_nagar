import { Metadata } from 'next';
import { Section } from '@/components/section';
import { Card } from '@/components/card';
import { GraduationCap, Users, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Teaching & Service',
  description: 'Teaching experience and academic service',
};

const teaching = [
  {
    title: 'Teaching Assistant',
    institution: 'IIT Indore',
    role: 'TA',
    period: '2019-2021',
    description: 'Assisted in signal processing courses, conducted lab sessions, and mentored students.',
  },
  {
    title: 'Subject Matter Expert',
    institution: 'Six Red Marbles',
    role: 'SME',
    period: '2020-2021',
    description: 'Content development for educational materials in signal processing and communications.',
  },
];

export default function TeachingPage() {
  return (
    <>
      <Section className="pt-32">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold">Teaching & Service</h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Academic contributions and educational service
            </p>
          </div>

          <div className="space-y-6">
            {teaching.map((item, index) => (
              <Card key={index}>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex-shrink-0">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-semibold mb-1">{item.title}</h2>
                      <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-3">
                        {item.institution}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          {item.role}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {item.period}
                        </div>
                      </div>
                      <p className="text-zinc-700 dark:text-zinc-300">{item.description}</p>
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
