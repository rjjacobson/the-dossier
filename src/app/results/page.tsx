import { Suspense } from 'react';
import Link from 'next/link';
import { LevelGroup } from '@/components/LevelGroup';
import { LEVEL_GROUP_ORDER, LEVEL_TO_GROUP } from '@/lib/constants';
import type { OfficialWithGrade, OfficeLevelGroup } from '@/lib/types';

// Demo data for development before Supabase is connected
const DEMO_OFFICIALS: OfficialWithGrade[] = [
  { id: 1, name: 'Kirsten Gillibrand', slug: 'kirsten-gillibrand', level: 'federal_senate', district_id: null, party: 'Democrat', photo_url: null, score: 1.8, grade: 'A', evidence_count: 5, created_at: '', updated_at: '' },
  { id: 2, name: 'Chuck Schumer', slug: 'chuck-schumer', level: 'federal_senate', district_id: null, party: 'Democrat', photo_url: null, score: 1.6, grade: 'A', evidence_count: 8, created_at: '', updated_at: '' },
  { id: 3, name: 'Jerry Nadler', slug: 'jerry-nadler', level: 'federal_house', district_id: null, party: 'Democrat', photo_url: null, score: 0.8, grade: 'B', evidence_count: 4, created_at: '', updated_at: '' },
  { id: 4, name: 'Brad Hoylman-Sigal', slug: 'brad-hoylman-sigal', level: 'state_senate', district_id: null, party: 'Democrat', photo_url: null, score: -0.2, grade: 'C', evidence_count: 3, created_at: '', updated_at: '' },
  { id: 5, name: 'Linda Rosenthal', slug: 'linda-rosenthal', level: 'state_assembly', district_id: null, party: 'Democrat', photo_url: null, score: 1.0, grade: 'B', evidence_count: 3, created_at: '', updated_at: '' },
  { id: 6, name: 'Erik Bottcher', slug: 'erik-bottcher', level: 'city_council', district_id: null, party: 'Democrat', photo_url: null, score: -1.2, grade: 'D', evidence_count: 4, created_at: '', updated_at: '' },
  { id: 7, name: 'Alvin Bragg', slug: 'alvin-bragg', level: 'county_da', district_id: null, party: 'Democrat', photo_url: null, score: null, grade: 'N/R', evidence_count: 1, created_at: '', updated_at: '' },
];

const DEMO_SNIPPETS: Record<number, string> = {
  1: 'Unwavering support for Israel\'s right to self-defense',
  2: 'Longtime advocate for US-Israel relationship',
  3: 'Voted for Iron Dome funding; criticized settlements',
  4: 'Mixed record, supported antisemitism bill, silent on BDS',
  5: 'Co-sponsored anti-BDS legislation in 2024',
  6: 'Refused to sign letter condemning campus antisemitism',
  7: 'No public statements on Israel',
};

function ResultsContent({ address }: { address: string }) {
  // Group officials by level group
  const grouped: Record<OfficeLevelGroup, OfficialWithGrade[]> = {
    'Federal': [],
    'State': [],
    'County / Borough': [],
    'City (NYC)': [],
    'Local': [],
    'Political': [],
  };

  for (const official of DEMO_OFFICIALS) {
    const group = LEVEL_TO_GROUP[official.level];
    grouped[group].push(official);
  }

  return (
    <div className="max-w-[720px] mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Your Representatives</h2>
        <div className="text-[13px] text-gray-500 text-right">{address}</div>
      </div>

      {LEVEL_GROUP_ORDER.map((group) => (
        <LevelGroup
          key={group}
          label={group}
          officials={grouped[group]}
          snippets={DEMO_SNIPPETS}
        />
      ))}

      <div className="mt-6 p-3 bg-gray-50 rounded-md">
        <p className="text-[11px] text-gray-400 italic">
          This is demo data. Connect to Supabase and import district boundaries to see real results for your address.
        </p>
      </div>

      <div className="mt-4">
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
