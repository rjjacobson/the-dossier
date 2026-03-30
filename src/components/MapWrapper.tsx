'use client';

import dynamic from 'next/dynamic';

const NYCMap = dynamic(
  () => import('@/components/NYCMap').then((m) => m.NYCMap),
  {
    ssr: false,
    loading: () => (
      <div className="my-8 w-full h-[350px] sm:h-[400px] rounded-lg border border-gray-200 bg-gray-100 animate-pulse" />
    ),
  }
);

export function MapWrapper() {
  return <NYCMap />;
}
