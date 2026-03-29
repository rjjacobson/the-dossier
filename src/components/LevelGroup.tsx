import { OfficialCard } from './OfficialCard';
import type { OfficialWithGrade } from '@/lib/types';

interface LevelGroupProps {
  label: string;
  officials: OfficialWithGrade[];
  snippets?: Record<number, string>;
}

export function LevelGroup({ label, officials, snippets }: LevelGroupProps) {
  if (officials.length === 0) {
    return (
      <div className="mb-6">
        <div className="text-[11px] uppercase tracking-widest text-gray-400 font-semibold mb-2.5 pb-1 border-b border-gray-100">
          {label}
        </div>
        <p className="text-sm text-gray-400 italic py-2">
          No data yet for this level.
        </p>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="text-[11px] uppercase tracking-widest text-gray-400 font-semibold mb-2.5 pb-1 border-b border-gray-100 sticky top-0 bg-white z-10 sm:static">
        {label}
      </div>
      <div className="space-y-2">
        {officials.map((official) => (
          <OfficialCard
            key={official.id}
            official={official}
            snippet={snippets?.[official.id]}
          />
        ))}
      </div>
    </div>
  );
}
