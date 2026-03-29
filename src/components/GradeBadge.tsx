import { GRADE_COLORS } from '@/lib/constants';
import type { Grade } from '@/lib/types';

interface GradeBadgeProps {
  grade: Grade;
  evidenceCount?: number;
  size?: 'sm' | 'md' | 'lg';
}

export function GradeBadge({ grade, evidenceCount, size = 'md' }: GradeBadgeProps) {
  const colors = GRADE_COLORS[grade];
  const sizeClasses = {
    sm: 'w-9 h-9 text-base',
    md: 'w-11 h-11 text-xl',
    lg: 'w-13 h-13 text-2xl',
  };

  return (
    <div className="flex flex-col items-center gap-0.5">
      <div
        className={`${sizeClasses[size]} ${colors.bg} ${colors.text} rounded-lg flex items-center justify-center font-extrabold shrink-0`}
        aria-label={`Grade ${grade}${grade === 'N/R' ? ': Not yet rated' : ''}`}
      >
        {grade}
      </div>
      {evidenceCount !== undefined && (
        <span className="text-[10px] text-gray-400">
          {evidenceCount < 2 ? 'Not enough data' : `${evidenceCount} data points`}
        </span>
      )}
    </div>
  );
}
