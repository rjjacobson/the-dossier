import { AddressInput } from '@/components/AddressInput';
import { MapWrapper } from '@/components/MapWrapper';
import { createClient } from '@/lib/supabase/server';

interface RecentActivity {
  id: number;
  quote: string;
  stance: string;
  date: string | null;
  source_name: string;
  official_name: string;
  official_level: string;
}

async function getRecentActivity(): Promise<RecentActivity[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('evidence')
      .select('id, quote, stance, date, source_name, official_id')
      .eq('verified', true)
      .order('date', { ascending: false })
      .limit(5);

    if (!data || data.length === 0) return [];

    // Get official names for these evidence items
    const officialIds = [...new Set(data.map((e: { official_id: number }) => e.official_id))];
    const { data: officials } = await supabase
      .from('officials')
      .select('id, name, level')
      .in('id', officialIds);

    const officialMap = new Map((officials || []).map((o: { id: number; name: string; level: string }) => [o.id, o]));

    return data.map((e: { id: number; quote: string; stance: string; date: string | null; source_name: string; official_id: number }) => {
      const official = officialMap.get(e.official_id);
      return {
        id: e.id,
        quote: e.quote.length > 120 ? e.quote.slice(0, 120) + '...' : e.quote,
        stance: e.stance,
        date: e.date,
        source_name: e.source_name,
        official_name: official?.name || 'Unknown',
        official_level: official?.level || '',
      };
    });
  } catch {
    return [];
  }
}

export default async function Home() {
  const activity = await getRecentActivity();

  return (
    <div className="max-w-[720px] mx-auto px-4">
      <div className="text-center py-16 sm:py-24">
        <h1 className="text-[28px] font-bold text-gray-900 mb-2">
          Know Your Representatives
        </h1>
        <p className="text-[15px] text-gray-500 max-w-md mx-auto mb-8 leading-relaxed">
          Track where every New York elected official stands on Israel and Jewish issues.
          From your school board to the US Senate.
        </p>
        <AddressInput />
      </div>

      <MapWrapper />

      {activity.length > 0 && (
        <div className="border-t border-gray-100 pt-5 pb-12">
          <h3 className="text-[13px] font-semibold text-gray-500 mb-3">
            Recent Activity
          </h3>
          <div className="space-y-0">
            {activity.map((item) => (
              <ActivityItem
                key={item.id}
                severity={stanceToSeverity(item.stance)}
                text={`${item.official_name}: ${item.quote}`}
                date={item.date ? formatDate(item.date) : item.source_name}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function stanceToSeverity(stance: string): 'red' | 'yellow' | 'green' {
  if (stance.includes('opposed')) return 'red';
  if (stance === 'neutral') return 'yellow';
  return 'green';
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function ActivityItem({ severity, text, date }: { severity: 'red' | 'yellow' | 'green'; text: string; date: string }) {
  const dotColor = {
    red: 'bg-red-500',
    yellow: 'bg-amber-500',
    green: 'bg-green-500',
  }[severity];

  return (
    <div className="flex items-start gap-2.5 py-2.5 border-b border-gray-50 last:border-0">
      <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${dotColor}`} />
      <div>
        <div className="text-[13px] text-gray-700 leading-snug">{text}</div>
        <div className="text-[11px] text-gray-400 mt-0.5">{date}</div>
      </div>
    </div>
  );
}
