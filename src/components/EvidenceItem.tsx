import { STANCE_COLORS, STANCE_LABELS, EVIDENCE_TYPE_LABELS } from '@/lib/constants';
import type { Evidence } from '@/lib/types';

interface EvidenceItemProps {
  evidence: Evidence;
}

export function EvidenceItem({ evidence }: EvidenceItemProps) {
  const stanceColors = STANCE_COLORS[evidence.stance];

  return (
    <div className="py-3 border-b border-gray-100 last:border-0">
      <div className="flex gap-1.5 mb-1.5">
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${stanceColors.bg} ${stanceColors.text}`}>
          {STANCE_LABELS[evidence.stance]}
        </span>
        <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-gray-100 text-gray-600">
          {EVIDENCE_TYPE_LABELS[evidence.type]}
        </span>
      </div>
      <p className="text-[13px] text-gray-800 leading-relaxed">
        &ldquo;{evidence.quote}&rdquo;
      </p>
      <div className="flex items-center gap-2 mt-1.5 text-[11px] text-gray-400">
        <a
          href={evidence.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-600 hover:underline"
        >
          {evidence.source_name}
        </a>
        {evidence.date && (
          <>
            <span>·</span>
            <span>{new Date(evidence.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
          </>
        )}
      </div>
    </div>
  );
}
