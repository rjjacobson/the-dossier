import { notFound } from 'next/navigation';
import Link from 'next/link';
import { GradeBadge } from '@/components/GradeBadge';
import { EvidenceItem } from '@/components/EvidenceItem';
import { ShareButtons } from '@/components/ShareButtons';
import { LEVEL_LABELS } from '@/lib/constants';
import type { OfficialWithGrade, Evidence } from '@/lib/types';
import type { Metadata } from 'next';

// Demo data
const DEMO_OFFICIALS: Record<string, OfficialWithGrade> = {
  'erik-bottcher': {
    id: 6, name: 'Erik Bottcher', slug: 'erik-bottcher', level: 'city_council',
    district_id: null, party: 'Democrat', photo_url: null,
    score: -1.2, grade: 'D', evidence_count: 4,
    created_at: '', updated_at: '',
  },
  'kirsten-gillibrand': {
    id: 1, name: 'Kirsten Gillibrand', slug: 'kirsten-gillibrand', level: 'federal_senate',
    district_id: null, party: 'Democrat', photo_url: null,
    score: 1.8, grade: 'A', evidence_count: 5,
    created_at: '', updated_at: '',
  },
};

const DEMO_EVIDENCE: Record<string, Evidence[]> = {
  'erik-bottcher': [
    { id: 1, official_id: 6, type: 'statement', quote: 'Refused to sign joint council letter condemning antisemitic incidents at Columbia University protests', source_url: 'https://example.com', source_name: 'NY Post', date: '2024-03-15', stance: 'opposed', verified: true, created_at: '' },
    { id: 2, official_id: 6, type: 'vote', quote: 'Voted NO on Resolution 1247-2024: Condemning the October 7th attacks and affirming NYC partnership with Tel Aviv', source_url: 'https://example.com', source_name: 'NYC Council Records', date: '2024-04-10', stance: 'strongly_opposed', verified: true, created_at: '' },
    { id: 3, official_id: 6, type: 'statement', quote: 'I support a two-state solution and believe in the rights of both Israelis and Palestinians', source_url: 'https://example.com', source_name: 'Town Hall Transcript', date: '2024-01-20', stance: 'neutral', verified: true, created_at: '' },
    { id: 4, official_id: 6, type: 'attendance', quote: 'Attended Hanukkah menorah lighting at Chelsea Piers', source_url: 'https://example.com', source_name: 'Official Instagram', date: '2023-12-10', stance: 'supportive', verified: true, created_at: '' },
  ],
  'kirsten-gillibrand': [
    { id: 5, official_id: 1, type: 'vote', quote: 'Voted to fund Iron Dome missile defense system', source_url: 'https://example.com', source_name: 'Senate Records', date: '2024-03-01', stance: 'strongly_supportive', verified: true, created_at: '' },
    { id: 6, official_id: 1, type: 'statement', quote: 'Unwavering support for Israel\'s right to self-defense against terrorism', source_url: 'https://example.com', source_name: 'Press Release', date: '2024-02-15', stance: 'strongly_supportive', verified: true, created_at: '' },
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const official = DEMO_OFFICIALS[slug];
  if (!official) return { title: 'Not Found' };

  return {
    title: `${official.name} — Grade ${official.grade} | The Dossier`,
    description: `${official.name} (${LEVEL_LABELS[official.level]}) has a ${official.grade} grade on Israel/Jewish issues. See the evidence.`,
  };
}

export default async function OfficialDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const official = DEMO_OFFICIALS[slug];
  if (!official) notFound();

  const evidence = DEMO_EVIDENCE[slug] || [];

  return (
    <div className="max-w-[720px] mx-auto px-4 py-8 pb-24 sm:pb-8">
      <Link href="/results" className="text-sm text-[#1a3a5c] hover:underline mb-6 block">
        ← Back to results
      </Link>

      <div className="flex gap-5 items-start mb-8">
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-3xl text-gray-400 shrink-0">
          {official.photo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={official.photo_url} alt={official.name} className="w-full h-full rounded-full object-cover" />
          ) : '👤'}
        </div>
        <div>
          <h2 className="text-[22px] font-bold text-gray-900">{official.name}</h2>
          <div className="text-sm text-gray-500">
            {LEVEL_LABELS[official.level]}
            {official.party && ` · ${official.party}`}
          </div>
          <div className="mt-2">
            <GradeBadge grade={official.grade} evidenceCount={official.evidence_count} size="lg" />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Evidence Trail</h3>
        {evidence.length === 0 ? (
          <div className="text-sm text-gray-400 italic py-4">
            Not Yet Rated. We don&apos;t have enough evidence yet. Know something? Submit evidence.
          </div>
        ) : (
          <div>
            {evidence.map((item) => (
              <EvidenceItem key={item.id} evidence={item} />
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 pt-4 border-t border-gray-100 hidden sm:block">
        <ShareButtons
          name={official.name}
          grade={official.grade}
          level={official.level}
          slug={official.slug}
        />
      </div>

      {/* Fixed bottom share bar on mobile */}
      <ShareButtons
        name={official.name}
        grade={official.grade}
        level={official.level}
        slug={official.slug}
        fixed
      />
    </div>
  );
}
