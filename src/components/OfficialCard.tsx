import Link from 'next/link';
import { GradeBadge } from './GradeBadge';
import { LEVEL_LABELS } from '@/lib/constants';
import type { OfficialWithGrade } from '@/lib/types';

interface OfficialCardProps {
  official: OfficialWithGrade;
  snippet?: string;
}

export function OfficialCard({ official, snippet }: OfficialCardProps) {
  return (
    <Link
      href={`/officials/${official.slug}`}
      className="flex items-center gap-3.5 p-3 border border-gray-200 rounded-md hover:border-gray-400 transition-colors"
    >
      <GradeBadge grade={official.grade} />
      <div className="flex-1 min-w-0">
        <div className="text-[15px] font-semibold text-gray-900 truncate">
          {official.name}
        </div>
        <div className="text-xs text-gray-500">
          {LEVEL_LABELS[official.level]}
          {official.party && ` · ${official.party}`}
        </div>
        {snippet && (
          <div className="text-xs text-gray-600 mt-0.5 italic truncate hidden sm:block">
            {snippet}
          </div>
        )}
      </div>
      <span className="text-gray-300 text-lg shrink-0" aria-hidden>›</span>
    </Link>
  );
}
