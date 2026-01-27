import { Metadata } from 'next';
import { Section } from '@/components/section';
import { Card } from '@/components/card';
import { Award, Trophy, GraduationCap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Achievements',
  description: 'Awards, recognitions, and achievements',
};

const achievements = [
  {
    icon: Award,
    title: '4 Spot (Key Player) Awards, 1 Star of the month (SOM), 1 Star of the quarter Award',
    description: 'Continental Autonomous Mobility',
    year: null,
  },
  {
    icon: Trophy,
    title: 'GATE 2018: 98.98 percentile',
    description: 'Graduate Aptitude Test in Engineering',
    year: 2018,
  },
  {
    icon: GraduationCap,
    title: 'IIT Indore M.Tech via GATE',
    description: 'Communication and Signal Processing',
    year: null,
  },
];

export default function AchievementsPage() {
  return (
    <>
      <Section className="pt-32">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold">Achievements</h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Awards, recognitions, and milestones
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <Card key={index}>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 w-fit">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold mb-1">{achievement.title}</h2>
                      <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                        {achievement.description}
                      </p>
                      {achievement.year && (
                        <p className="text-zinc-500 dark:text-zinc-500 text-sm mt-1">
                          {achievement.year}
                        </p>
                      )}
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
