'use client';

import { useState } from 'react';
import type { Grade } from '@/lib/types';
import { LEVEL_LABELS } from '@/lib/constants';
import type { OfficeLevel } from '@/lib/types';

interface ShareButtonsProps {
  name: string;
  grade: Grade;
  level: OfficeLevel;
  slug: string;
  fixed?: boolean;
}

export function ShareButtons({ name, grade, level, slug, fixed }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const url = typeof window !== 'undefined'
    ? `${window.location.origin}/officials/${slug}`
    : `/officials/${slug}`;

  const roleLabel = LEVEL_LABELS[level];
  const message = `Did you know your ${roleLabel} has a ${grade} grade on Israel/Jewish issues? Check the evidence: ${url}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
  const emailSubject = `${name} - Grade ${grade} on Israel/Jewish Issues`;
  const emailUrl = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(message)}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
    }
  }

  const containerClass = fixed
    ? 'fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex gap-2 z-50 sm:hidden'
    : 'flex gap-2 flex-wrap';

  return (
    <div className={containerClass}>
      <button
        onClick={copyLink}
        className="px-4 py-2 border border-gray-200 rounded-md text-xs text-gray-600 hover:bg-gray-50 transition-colors"
      >
        {copied ? 'Copied!' : 'Copy Link'}
      </button>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 border border-gray-200 rounded-md text-xs text-gray-600 hover:bg-gray-50 transition-colors"
      >
        WhatsApp
      </a>
      <a
        href={emailUrl}
        className="px-4 py-2 border border-gray-200 rounded-md text-xs text-gray-600 hover:bg-gray-50 transition-colors"
      >
        Email
      </a>
    </div>
  );
}
