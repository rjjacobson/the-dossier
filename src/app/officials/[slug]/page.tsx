import { notFound } from 'next/navigation';
import Link from 'next/link';
import { GradeBadge } from '@/components/GradeBadge';
import { EvidenceItem } from '@/components/EvidenceItem';
import { ShareButtons } from '@/components/ShareButtons';
import { LEVEL_LABELS } from '@/lib/constants';
import { createClient } from '@/lib/supabase/server';
import type { OfficialWithGrade, Evidence } from '@/lib/types';
import type { Metadata } from 'next';

async function getOfficial(slug: string): Promise<{ official: OfficialWithGrade | null; evidence: Evidence[] }> {
  const supabase = await createClient();

  const { data: official } = await supabase
    .from('officials_with_grades')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!official) return { official: null, evidence: [] };

  const { data: evidence } = await supabase
    .from('evidence')
    .select('*')
    .eq('official_id', official.id)
    .eq('verified', true)
    .order('date', { ascending: false });

  return {
    official: official as OfficialWithGrade,
    evidence: (evidence || []) as Evidence[],
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { official } = await getOfficial(slug);
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
  const { official, evidence } = await getOfficial(slug);
  if (!official) notFound();

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
