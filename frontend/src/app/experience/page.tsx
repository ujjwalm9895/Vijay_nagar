import { Metadata } from 'next';
import { Section } from '@/components/section';
import { Card } from '@/components/card';
import { Briefcase, MapPin, Calendar, Award } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'Professional experience and work history',
};

const experiences = [
  {
    title: 'Computer Vision Engineer',
    company: 'Continental Autonomous Mobility',
    location: 'Bangalore, India',
    startDate: 'Oct 2021',
    endDate: null,
    current: true,
    description:
      'Working on ADAS perception systems including traffic signs, traffic lights, road markings, and 3D mapping pipelines. Developing production-grade computer vision solutions for autonomous driving.',
    achievements: ['4 Spot Awards for outstanding contributions'],
  },
  {
    title: 'Junior Deep Learning Engineer',
    company: 'TDB.ai',
    location: 'Bangalore, India',
    startDate: 'Jul 2021',
    endDate: 'Oct 2021',
    current: false,
    description:
      'Developed deep learning models for various computer vision applications. Worked on model optimization and deployment.',
  },
];

export default function ExperiencePage() {
  return (
    <>
      <Section className="pt-32">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold">Experience</h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Professional journey in computer vision and AI
            </p>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <Card key={index}>
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-semibold mb-1">{exp.title}</h2>
                    <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-3">{exp.company}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {exp.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {exp.startDate} - {formatDate(exp.endDate)}
                        {exp.current && (
                          <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs font-medium">
                            Current
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-zinc-700 dark:text-zinc-300">{exp.description}</p>

                  {exp.achievements && (
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Award className="h-4 w-4" />
                        Achievements:
                      </h3>
                      <ul className="list-disc list-inside space-y-1 text-zinc-600 dark:text-zinc-400">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx}>{achievement}</li>
                        ))}
                      </ul>
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
