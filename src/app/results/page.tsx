import { Suspense } from 'react';
import Link from 'next/link';
import { LevelGroup } from '@/components/LevelGroup';
import { LEVEL_GROUP_ORDER, LEVEL_TO_GROUP } from '@/lib/constants';
import { createClient } from '@/lib/supabase/server';
import type { OfficialWithGrade, OfficeLevelGroup } from '@/lib/types';

async function getOfficials(): Promise<{ officials: OfficialWithGrade[]; snippets: Record<number, string> }> {
  const supabase = await createClient();

  // Get all officials with computed grades via the view
  const { data: officials, error } = await supabase
    .from('officials_with_grades')
    .select('*')
    .order('level')
    .order('name');

  if (error || !officials) {
    console.error('Failed to fetch officials:', error);
    return { officials: [], snippets: {} };
  }

  // Get one snippet (most recent evidence quote) per official
  const officialIds = officials.map((o: OfficialWithGrade) => o.id);
  const { data: evidenceSnippets } = await supabase
    .from('evidence')
    .select('official_id, quote')
    .in('official_id', officialIds)
    .eq('verified', true)
    .order('date', { ascending: false });

  const snippets: Record<number, string> = {};
  if (evidenceSnippets) {
    for (const e of evidenceSnippets) {
      if (!snippets[e.official_id]) {
        snippets[e.official_id] = e.quote.length > 100
          ? e.quote.slice(0, 100) + '...'
          : e.quote;
      }
    }
  }

  return { officials: officials as OfficialWithGrade[], snippets };
}

async function ResultsContent({ address }: { address: string }) {
  const { officials, snippets } = await getOfficials();

  // Group officials by level group
  const grouped: Record<OfficeLevelGroup, OfficialWithGrade[]> = {
    'Federal': [],
    'State': [],
    'County / Borough': [],
    'City (NYC)': [],
    'Local': [],
    'Political': [],
  };

  for (const official of officials) {
    const group = LEVEL_TO_GROUP[official.level];
    if (group) grouped[group].push(official);
  }

  const hasOfficials = officials.length > 0;

  return (
    <div className="max-w-[720px] mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Your Representatives</h2>
        <div className="text-[13px] text-gray-500 text-right">{address}</div>
      </div>

      {!hasOfficials ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-2">We don&apos;t have coverage for this area yet.</p>
          <p className="text-sm text-gray-400">Help us by suggesting an official to track.</p>
        </div>
      ) : (
        LEVEL_GROUP_ORDER.map((group) => {
          if (grouped[group].length === 0) return null;
          return (
            <LevelGroup
              key={group}
              label={group}
              officials={grouped[group]}
              snippets={snippets}
            />
          );
        })
      )}

      <div className="mt-6">
        <Link href="/" className="text-sm text-[#1a3a5c] hover:underline">
          ← Look up another address
        </Link>
      </div>
    </div>
  );
}

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ address?: string; lat?: string; lng?: string }>;
}) {
  const params = await searchParams;
  const address = params.address || 'New York, NY';

  return (
    <Suspense fallback={<ResultsSkeleton />}>
      <ResultsContent address={address} />
    </Suspense>
  );
}

function ResultsSkeleton() {
  return (
    <div className="max-w-[720px] mx-auto px-4 py-8">
      <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-6" />
      {[1, 2, 3].map((i) => (
        <div key={i} className="mb-6">
          <div className="h-3 w-20 bg-gray-100 rounded animate-pulse mb-3" />
          {[1, 2].map((j) => (
            <div key={j} className="flex items-center gap-3 p-3 border border-gray-100 rounded-md mb-2">
              <div className="w-11 h-11 bg-gray-200 rounded-lg animate-pulse" />
              <div className="flex-1">
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-1" />
                <div className="h-3 w-24 bg-gray-100 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
