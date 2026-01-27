import { Metadata } from 'next';
import { Section } from '@/components/section';
import { Card } from '@/components/card';
import { ExternalLink, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Publications',
  description: 'Research publications and papers by Vijay Nagar',
};

const publication = {
  title:
    'STAlign-Net: Multi-Frame Spatiotemporal Feature Aggregation with Convolution-based Deformable Cross-Attention for Video Traffic Light Detection',
  conference: 'IEEE CONECCT 2025',
  venue: 'Bengaluru',
  year: 2025,
  authors: 'Vijay Nagar, S. Kizhiyedath, T. R. Ratheesh',
  description:
    'Multi-frame spatiotemporal alignment using convolution-based deformable cross-attention on a CenterNet backbone.',
  contributions: [
    'Multi-frame alignment',
    'Deformable cross-attention',
    'Robust detection under blur, motion, occlusion by leveraging spatio-temporal information',
  ],
    doi: 'https://ieeexplore.ieee.org/document/11306544/references#references',
    pdfUrl: 'https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=11306544',
};

export default function PublicationsPage() {
  return (
    <>
      <Section className="pt-32">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold">Publications</h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Research contributions in computer vision and AI
            </p>
          </div>

          <Card>
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-semibold mb-2">{publication.title}</h2>
                <p className="text-zinc-600 dark:text-zinc-400">
                  {publication.conference} {publication.year} • {publication.venue}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-2">
                  {publication.authors}
                </p>
              </div>

              <p className="text-zinc-700 dark:text-zinc-300">{publication.description}</p>

              <div>
                <h3 className="font-semibold mb-2">Key Contributions:</h3>
                <ul className="list-disc list-inside space-y-1 text-zinc-600 dark:text-zinc-400">
                  {publication.contributions.map((contribution, index) => (
                    <li key={index}>{contribution}</li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-4 pt-4">
                {publication.doi && (
                  <a
                    href={publication.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-sm"
                  >
                    <ExternalLink className="h-4 w-4" />
                    DOI
                  </a>
                )}
                {publication.pdfUrl && (
                  <a
                    href={publication.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-sm"
                  >
                    <FileText className="h-4 w-4" />
                    PDF
                  </a>
                )}
              </div>
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}
